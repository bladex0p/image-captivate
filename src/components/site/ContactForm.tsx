import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContact } from "@/lib/forms.functions";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(1, "Please enter a message").max(2000),
  website: z.string().optional(),
});
type Values = z.infer<typeof schema>;

export function ContactForm({ withPhone = true, source = "contact" }: { withPhone?: boolean; source?: string }) {
  const send = useServerFn(submitContact);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [err, setErr] = useState("");
  const { register, handleSubmit, reset, formState } = useForm<Values>({ resolver: zodResolver(schema) });
  const e = formState.errors;

  const onSubmit = async (v: Values) => {
    try {
      await send({ data: { ...v, phone: v.phone ?? "", website: v.website ?? "", source } });
      setStatus("sent");
      reset();
    } catch (x) {
      setErr(x instanceof Error ? x.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="rounded-md border border-line p-8">
        <h3 className="text-3xl">Message sent</h3>
        <p className="mt-2 text-fg-muted">Thanks for getting in touch. Our team will reply as soon as possible.</p>
        <Button variant="outlineLight" className="mt-6" onClick={() => setStatus("idle")}>Send another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("website")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name">Name</Label>
          <Input id="c-name" className="mt-1.5 h-11" autoComplete="name" {...register("name")} aria-invalid={!!e.name} />
          {e.name && <p className="mt-1 text-xs text-destructive">{e.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="c-email">Email</Label>
          <Input id="c-email" type="email" className="mt-1.5 h-11" autoComplete="email" {...register("email")} aria-invalid={!!e.email} />
          {e.email && <p className="mt-1 text-xs text-destructive">{e.email.message}</p>}
        </div>
      </div>
      {withPhone && (
        <div>
          <Label htmlFor="c-phone">Phone</Label>
          <Input id="c-phone" type="tel" className="mt-1.5 h-11" autoComplete="tel" {...register("phone")} />
        </div>
      )}
      <div>
        <Label htmlFor="c-msg">Message</Label>
        <Textarea id="c-msg" rows={5} className="mt-1.5" {...register("message")} aria-invalid={!!e.message} />
        {e.message && <p className="mt-1 text-xs text-destructive">{e.message.message}</p>}
      </div>
      {status === "error" && <p role="alert" className="text-sm text-destructive">{err}</p>}
      <Button type="submit" disabled={formState.isSubmitting} className="justify-self-start">
        {formState.isSubmitting ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}
