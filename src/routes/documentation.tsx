import { createFileRoute, Link } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";

const TITLE = "Docs — Starknet Wallet";
const DESC = "How to install, verify, and use Starknet Wallet on macOS, Windows, and Linux.";

const CARDS = [
  { id: "getting-started", label: "Getting Started" },
  { id: "installation", label: "Installation" },
  { id: "verifying", label: "Verifying builds" },
  { id: "strk", label: "Managing STRK" },
  { id: "cairo-preview", label: "Previewing Cairo calls" },
  { id: "smart-accounts", label: "Reviewing smart-account permissions" },
  { id: "networks", label: "Mainnet vs Sepolia" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://starknetwallet.org/documentation" },
    ],
    links: [{ rel: "canonical", href: "https://starknetwallet.org/documentation" }],
  }),
  component: () => (
    <SimplePage eyebrow="Developers" title="Run Starknet Wallet with confidence.">
      <p>
        Practical guides for installing Starknet Wallet, verifying signed
        desktop builds, managing STRK, and reviewing Cairo calls and
        smart-account permissions.
      </p>

      <div className="not-prose grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="rounded-xl border border-hairline bg-surface p-4 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            {c.label}
          </a>
        ))}
      </div>

      <h2 id="getting-started">Getting Started</h2>
      <p>
        Starknet Wallet is a local-first desktop wallet for Starknet. Install
        the build for your platform, choose Mainnet or Sepolia, and create or
        import a Starknet account. Keys are generated and stored on your
        device.
      </p>

      <h2 id="installation">Installation</h2>
      <ul>
        <li>macOS — open the <code>.dmg</code> and drag Starknet Wallet into Applications.</li>
        <li>Windows — run the signed <code>.exe</code> installer.</li>
        <li>Linux — use the <code>.AppImage</code> or install the <code>.deb</code> package.</li>
      </ul>

      <h2 id="verifying">Verifying builds</h2>
      <ol className="list-decimal pl-6 space-y-1.5">
        <li>Download the installer for your platform.</li>
        <li>Download the SHA256 checksum from the <Link to="/releases">Versions</Link> page.</li>
        <li>Download the PGP signature.</li>
        <li>Compare the SHA256 of your file with the published checksum, and verify the PGP signature with the published key.</li>
      </ol>

      <h2 id="strk">Managing STRK</h2>
      <p>
        Starknet Wallet shows your STRK balance, transaction history, and lets
        you send and receive STRK on Starknet Mainnet or Sepolia. Network
        selection is always visible.
      </p>

      <h2 id="cairo-preview">Previewing Cairo calls</h2>
      <p>
        Before signing, Starknet Wallet shows the dApp, network, target
        contract, function name, decoded calldata, and an estimated fee. If a
        call implies a permission change, that is surfaced as part of the
        preview.
      </p>

      <h2 id="smart-accounts">Reviewing smart-account permissions</h2>
      <p>
        Smart accounts support session keys and spending approvals. The
        permission review screen shows scope, limits, and expiry so you can
        confirm what the dApp is asking for.
      </p>

      <h2 id="networks">Mainnet vs Sepolia</h2>
      <p>
        Starknet Mainnet and Starknet Sepolia are clearly separated in the
        UI. Switching networks is explicit, and the active network is shown
        on every signing surface to avoid wrong-network signing.
      </p>

      <h2 id="troubleshooting">Troubleshooting</h2>
      <ul>
        <li>Installer won't open — verify the SHA256 and PGP signature first.</li>
        <li>Network errors — try a different RPC and confirm the chain ID.</li>
        <li>Account import — re-check the source of your account material before pasting.</li>
        <li>Still stuck? See <Link to="/contact">Contact</Link>.</li>
      </ul>
    </SimplePage>
  ),
});
