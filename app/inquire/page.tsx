"use client";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const cats = ["Photography", "Videography and event coverage", "Content creation", "Creative consulting"];
const field = "w-full rounded-3xl border border-[#9a8ac6] bg-transparent px-4 py-3 text-paper";

export default function Inquire() {
  const [cat, setCat] = useState(cats[0]);
  useEffect(() => { const q = new URLSearchParams(window.location.search).get("service"); if (q && cats.includes(q)) setCat(q); }, []);
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");
  const consulting = cat === "Creative consulting";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const { endpoint, accessKey } = site.form;
      if (!endpoint || (endpoint.includes("web3forms.com") && !accessKey)) throw new Error(`The inquiry form isn’t connected yet.${site.contactEmail ? ` Please email ${site.contactEmail}.` : ""}`);
      if (data.company) { setState("ok"); return; } // honeypot: bots fill the hidden field
      const payload = accessKey ? { ...data, access_key: accessKey, subject: `New inquiry: ${data.service} — ${data.name}`, from_name: "Belle Visuals website" } : data;
      const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.success === false) throw new Error("Couldn’t send your inquiry. Please try again.");
      setState("ok");
    } catch (err) { setMsg((err as Error).message); setState("error"); }
  }

  if (state === "ok") return <section className="px-5 py-16 md:px-12"><h1 className="text-4xl font-serif font-normal md:text-6xl" role="status">Thank you — your inquiry was sent.</h1></section>;

  const L = ({ id, children }: { id: string; children: React.ReactNode }) => <label htmlFor={id} className="mono mb-2 mt-6 block">{children}</label>;
  return (
    <section className="px-5 py-16 md:px-12">
      <h1 className="mb-10 text-5xl font-serif font-normal tracking-tight md:text-7xl">Start a project</h1>
      <form onSubmit={submit} className="max-w-2xl" noValidate={false}>
        <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" /> {/* honeypot */}
        <L id="name">Name</L><input id="name" name="name" required maxLength={120} className={field} autoComplete="name" />
        <L id="email">Email</L><input id="email" name="email" type="email" required maxLength={200} className={field} autoComplete="email" />
        <L id="service">Service category</L>
        <select id="service" name="service" value={cat} onChange={(e) => setCat(e.target.value)} className={field}>{cats.map((c) => <option key={c} className="bg-ink">{c}</option>)}</select>
        <L id="description">{consulting ? "Main challenge" : "Project description"}</L>
        <textarea id="description" name="description" required minLength={10} maxLength={4000} rows={5} className={field} />
        {consulting ? (<>
          <L id="goals">Goals</L><textarea id="goals" name="goals" rows={3} maxLength={2000} className={field} />
          <L id="profile">Website or social profile</L><input id="profile" name="profile" maxLength={300} className={field} />
        </>) : (<>
          <L id="eventDate">Event date and location</L><input id="eventDate" name="eventDate" maxLength={300} className={field} />
          <L id="budget">Project budget</L><input id="budget" name="budget" maxLength={100} className={field} />
          <L id="deliverables">Desired deliverables</L><input id="deliverables" name="deliverables" maxLength={500} className={field} />
          <L id="timeline">Project timeline</L><input id="timeline" name="timeline" maxLength={200} className={field} />
        </>)}
        <button className="btn btn-pri mt-8" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send inquiry"}</button>
        {state === "error" && <p role="alert" className="mt-4 text-accent">{msg}</p>}
      </form>
    </section>
  );
}
