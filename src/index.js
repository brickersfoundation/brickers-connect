function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function clean(value, max = 12000) {
  return String(value ?? "").trim().slice(0, max);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function checkAdmin(request, env) {
  const key = request.headers.get("X-Admin-Key");
  return env.ADMIN_TOKEN && key === env.ADMIN_TOKEN;
}

async function getPosts(env) {
  const result = await env.DB.prepare(`
    SELECT
      id,
      post_type,
      title,
      submitter_name,
      location,
      link,
      content,
      image_url,
      verified,
      featured,
      status,
      created_at
    FROM community_posts
    WHERE status = 'published'
    ORDER BY featured DESC, created_at DESC
    LIMIT 100
  `).all();

  return json({ posts: result.results || [] });
}

async function createPost(request, env) {
  const form = await request.formData();

  if (clean(form.get("website"), 200)) {
    return json({ ok: true });
  }

  const postType = clean(form.get("submissionKind"), 100);
  const title = clean(form.get("title"), 140);
  const submitter = clean(form.get("submitter"), 120);
  const email = clean(form.get("email"), 180);
  const location = clean(form.get("location"), 160);
  const link = clean(form.get("link"), 500);
  const content = clean(form.get("details"), 12000);

  if (!postType || !title || !submitter || !email || !content) {
    return json({ error: "Please complete all required fields." }, 400);
  }

  if (!validEmail(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  let imageUrl = null;
  const image = form.get("image");

  if (image && typeof image === "object" && image.size > 0) {
    const allowed = ["image/jpeg", "image/png", "image/webp"];

    if (!allowed.includes(image.type)) {
      return json({ error: "Image must be JPG, PNG, or WebP." }, 400);
    }

    if (image.size > 800000) {
      return json({
        error: "That image is still too large. Please choose or compress an image under 800 KB."
      }, 413);
    }

    const bytes = new Uint8Array(await image.arrayBuffer());

    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    imageUrl = `data:${image.type};base64,${btoa(binary)}`;
  }

  const result = await env.DB.prepare(`
    INSERT INTO community_posts
    (
      post_type,
      title,
      submitter_name,
      contact_email,
      location,
      link,
      content,
      image_url,
      verified,
      featured,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 'published')
  `)
    .bind(
      postType,
      title,
      submitter,
      email,
      location || null,
      link || null,
      content,
      imageUrl
    )
    .run();

  return json({
    ok: true,
    id: result.meta?.last_row_id,
    message: "Your post is live on the Community Blog."
  }, 201);
}

async function adminPosts(request, env) {
  if (!checkAdmin(request, env)) {
    return json({ error: "Unauthorized." }, 401);
  }

  const result = await env.DB.prepare(`
    SELECT *
    FROM community_posts
    ORDER BY created_at DESC
    LIMIT 250
  `).all();

  return json({ posts: result.results || [] });
}

async function updatePost(request, env, id) {
  if (!checkAdmin(request, env)) {
    return json({ error: "Unauthorized." }, 401);
  }

  const body = await request.json();

  if (body.action === "verify") {
    await env.DB.prepare(
      "UPDATE community_posts SET verified = 1 WHERE id = ?"
    ).bind(id).run();

    return json({ ok: true });
  }

  if (body.action === "unverify") {
    await env.DB.prepare(
      "UPDATE community_posts SET verified = 0 WHERE id = ?"
    ).bind(id).run();

    return json({ ok: true });
  }

  if (body.action === "feature") {
    await env.DB.prepare(
      "UPDATE community_posts SET featured = 1 WHERE id = ?"
    ).bind(id).run();

    return json({ ok: true });
  }

  if (body.action === "unfeature") {
    await env.DB.prepare(
      "UPDATE community_posts SET featured = 0 WHERE id = ?"
    ).bind(id).run();

    return json({ ok: true });
  }

  return json({ error: "Unknown action." }, 400);
}

async function deletePost(request, env, id) {
  if (!checkAdmin(request, env)) {
    return json({ error: "Unauthorized." }, 401);
  }

  await env.DB.prepare(
    "DELETE FROM community_posts WHERE id = ?"
  ).bind(id).run();

  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return json({
        ok: true,
        database: Boolean(env.DB)
      });
    }

    if (url.pathname === "/api/posts") {
      if (request.method === "GET") {
        return getPosts(env);
      }

      if (request.method === "POST") {
        return createPost(request, env);
      }
    }

    if (url.pathname === "/api/admin/posts" && request.method === "GET") {
      return adminPosts(request, env);
    }

    const adminMatch = url.pathname.match(/^\/api\/admin\/posts\/(\d+)$/);

    if (adminMatch) {
      const id = Number(adminMatch[1]);

      if (request.method === "PATCH") {
        return updatePost(request, env, id);
      }

      if (request.method === "DELETE") {
        return deletePost(request, env, id);
      }
    }

    return env.ASSETS.fetch(request);
  }
};
