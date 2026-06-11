import { createServerFn } from "@tanstack/react-start";

function assertAdmin(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD is not configured");
  if (password !== expected) throw new Error("Unauthorized");
}

export const addBagServer = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string; name: string; price: string; comment: string; image: string }) => {
    if (typeof data?.password !== "string") throw new Error("Invalid input");
    return {
      password: data.password,
      name: String(data.name ?? "").slice(0, 200),
      price: String(data.price ?? "").slice(0, 100),
      comment: String(data.comment ?? "").slice(0, 2000),
      image: String(data.image ?? "").slice(0, 5_000_000),
    };
  })
  .handler(async ({ data }) => {
    assertAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("bags").insert({
      name: data.name,
      price: data.price,
      comment: data.comment,
      image: data.image,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const removeBagServer = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string; id: string }) => {
    if (typeof data?.password !== "string" || typeof data?.id !== "string") throw new Error("Invalid input");
    return { password: data.password, id: data.id };
  })
  .handler(async ({ data }) => {
    assertAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("bags").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
