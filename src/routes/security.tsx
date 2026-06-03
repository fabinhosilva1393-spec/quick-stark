import { createFileRoute, Link } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";

const TITLE = "Security — StarknetWallet";
const DESC =
  "Local-first keys, Cairo call preview, smart-account permission review, and signed builds for StarknetWallet.";

const PILLARS = [
  {
    title: "Local-first keys",
    body: "Sensitive account data stays on your device by default. Private keys are never transmitted to a remote server.",
  },
  {
    title: "Cairo call preview",
    body: "See contract calls and calldata context before signing. Review the dApp, network, contract, function, and fee in one place.",
  },
  {
    title: "Smart-account permissions",
    body: "Review session keys, spending approvals, and account permissions before granting or extending them.",
  },
  {
    title: "Signed builds",
    body: "Verify downloads with SHA256 checksums and PGP signatures. Maintained desktop builds are reproducible from open source.",
  },
  {
    title: "No telemetry by default",
    body: "No analytics, no usage tracking, and no remote logging unless you explicitly opt in.",
  },
  {
    title: "Network clarity",
    body: "Starknet Mainnet and Starknet Sepolia are clearly separated before every action so you always know what you are signing on.",
  },
];

const THREATS = [
  { threat: "Malicious dApp transaction", scenario: "A dApp requests a call that hides intent in calldata.", mitigation: "Cairo call preview surfaces the target contract, function, and decoded calldata before signing.", status: "Mitigated" },
  { threat: "Blind signing risk", scenario: "User signs without seeing what the call does.", mitigation: "Signing is always preceded by a structured transaction view.", status: "Mitigated" },
  { threat: "RPC tampering", scenario: "A compromised RPC returns inconsistent data.", mitigation: "Network and chain ID are validated and shown alongside every action.", status: "Monitored" },
  { threat: "Clipboard hijack", scenario: "Malware swaps an address from the clipboard.", mitigation: "Address checksums and full-address display reduce reliance on truncated views.", status: "Monitored" },
  { threat: "Supply-chain download", scenario: "User downloads a tampered installer.", mitigation: "SHA256 checksums and PGP signatures published for the current maintained build.", status: "Mitigated" },
  { threat: "Phishing UI", scenario: "Look-alike sites or apps imitate StarknetWallet.", mitigation: "Brand guidelines, signed builds, and verification instructions.", status: "Monitored" },
  { threat: "Session key abuse", scenario: "Granted session keys exceed user intent.", mitigation: "Smart-account permission review highlights scope and limits.", status: "Mitigated" },
  { threat: "Wrong network signing", scenario: "User signs on Mainnet thinking they are on Sepolia.", mitigation: "Mainnet and Sepolia are visually distinct in every signing surface.", status: "Mitigated" },
];

const TIERS = [
  { tier: "Tier 0", name: "Hardware wallet / secure signer", note: "When available — planned support for popular hardware signers." },
  { tier: "Tier 1", name: "OS keychain / Secure Enclave", note: "When available on the host operating system." },
  { tier: "Tier 2", name: "Argon2id session key", note: "Derived from a user passphrase, held only in memory for the session." },
  { tier: "Tier 3", name: "Encrypted local keystore", note: "Account material is encrypted at rest on disk." },
  { tier: "Tier 4", name: "Account metadata & network preferences", note: "Non-sensitive configuration kept locally." },
];

function StatusPill({ status }: { status: string }) {
  const cls =
    status === "Mitigated"
      ? "bg-brand/10 text-brand"
      : status === "Planned"
      ? "bg-muted text-ink"
      : "bg-surface-2 text-ink-muted";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => (
    <SimplePage eyebrow="Security" title="Verifiable security, all the way down.">
      <p>
        StarknetWallet is designed around local-first keys, clear transaction
        review, Cairo call previews, and smart-account permission checks. The
        goal is simple: review before you sign.
      </p>

      <ul
        style={{ listStyle: "none", paddingLeft: 0 }}
        className="not-prose mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {["Local-first keys", "No telemetry by default", "Signed builds", "Mainnet/Sepolia clarity"].map((s) => (
          <li key={s} className="rounded-lg border border-hairline bg-surface p-3 text-xs font-semibold text-ink">
            {s}
          </li>
        ))}
      </ul>

      <h2>Six pillars, one rule: review before you sign.</h2>
      <p>
        StarknetWallet treats networks, dApps, contracts, and clipboard data as
        inputs to verify — not assumptions to trust.
      </p>
      <div className="not-prose grid gap-4 sm:grid-cols-2">
        {PILLARS.map((p) => (
          <div key={p.title} className="rounded-xl border border-hairline bg-surface p-5">
            <h3 className="text-base font-bold text-ink">{p.title}</h3>
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <h2>Threat model</h2>
      <p>
        A structured view of the scenarios we account for when designing
        review flows. Statuses use plain language and describe how each
        scenario is addressed in the product.
      </p>
      <div className="not-prose overflow-x-auto rounded-xl border border-hairline">
        <table className="w-full text-sm">
          <thead className="bg-surface-2 text-left text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Threat</th>
              <th className="px-4 py-3 font-semibold">Scenario</th>
              <th className="px-4 py-3 font-semibold">Mitigation</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {THREATS.map((t) => (
              <tr key={t.threat} className="border-t border-hairline align-top">
                <td className="px-4 py-3 font-semibold text-ink">{t.threat}</td>
                <td className="px-4 py-3 text-ink-muted">{t.scenario}</td>
                <td className="px-4 py-3 text-ink-muted">{t.mitigation}</td>
                <td className="px-4 py-3"><StatusPill status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Layered custody, local by default.</h2>
      <div className="not-prose grid gap-3">
        {TIERS.map((t) => (
          <div key={t.tier} className="flex flex-col gap-1 rounded-lg border border-hairline bg-surface p-4 sm:flex-row sm:items-center sm:gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand sm:w-20">{t.tier}</span>
            <span className="font-semibold text-ink sm:w-72">{t.name}</span>
            <span className="text-sm text-ink-muted">{t.note}</span>
          </div>
        ))}
      </div>

      <h2>Readable Cairo context before signing.</h2>
      <p>
        Every signing surface aims to show: the dApp, the network, the target
        contract, the function and decoded calldata, an estimated fee, and any
        permission changes implied by the call.
      </p>

      <h2>Verify the binary you’re running.</h2>
      <p>
        Each signed build includes a SHA256 checksum and a PGP signature.
        The hash and signing key fingerprint for the current maintained
        build are published on the <Link to="/releases">Versions</Link> page.
      </p>

      <h2>Built to be inspected.</h2>
      <p>
        Read the source, verify the build, review the Cairo call. Then
        sign. See <Link to="/documentation">Documentation</Link> for how to
        verify builds step by step.
      </p>
    </SimplePage>
  ),
});
