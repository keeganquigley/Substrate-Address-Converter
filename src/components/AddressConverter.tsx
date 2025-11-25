import { useState, useMemo } from "react";
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto";
import { NETWORKS, type Network } from "../networks";

interface ConvertedAddress {
  network: Network;
  address: string;
}

export function AddressConverter() {
  const [inputAddress, setInputAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const convertedAddresses = useMemo<ConvertedAddress[]>(() => {
    if (!inputAddress.trim()) {
      return [];
    }

    try {
      // Decode the input address to get the public key
      const publicKey = decodeAddress(inputAddress);
      setError(null);

      // Convert to all network formats
      const addresses = NETWORKS.map((network) => ({
        network,
        address: encodeAddress(publicKey, network.prefix),
      }));

      return addresses;
    } catch (err) {
      setError("Invalid address format. Please enter a valid Substrate address.");
      return [];
    }
  }, [inputAddress]);

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  // Group addresses by category
  const groupedAddresses = useMemo(() => {
    const groups: Record<string, ConvertedAddress[]> = {
      "Relay Chain": [],
      "System Chain": [],
      Parachain: [],
    };

    convertedAddresses.forEach((item) => {
      groups[item.network.category].push(item);
    });

    return groups;
  }, [convertedAddresses]);

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold">Substrate Address Converter</h1>
        <p className="text-gray-400">
          Convert any Substrate address to different network formats
        </p>
      </div>

      {/* Input Section */}
      <div className="mb-8">
        <label htmlFor="address-input" className="mb-2 block text-sm font-medium">
          Enter Substrate Address
        </label>
        <input
          id="address-input"
          type="text"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          placeholder="e.g., 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
          className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>

      {/* Converted Addresses */}
      {convertedAddresses.length > 0 && (
        <div className="space-y-6">
          {Object.entries(groupedAddresses).map(
            ([category, addresses]) =>
              addresses.length > 0 && (
                <div key={category}>
                  <h2 className="mb-3 text-xl font-semibold text-gray-300">{category}s</h2>
                  <div className="space-y-2">
                    {addresses.map((item, index) => (
                      <div
                        key={`${item.network.prefix}-${index}`}
                        className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4 transition-colors hover:border-gray-600"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <span className="font-semibold text-white">
                              {item.network.name}
                            </span>
                            {item.network.symbol && (
                              <span className="rounded bg-blue-900 px-2 py-0.5 text-xs text-blue-200">
                                {item.network.symbol}
                              </span>
                            )}
                            <span className="text-xs text-gray-500">
                              (prefix: {item.network.prefix})
                            </span>
                          </div>
                          <div className="break-all font-mono text-sm text-gray-400">
                            {item.address}
                          </div>
                        </div>
                        <button
                          onClick={() => handleCopyAddress(item.address)}
                          className="ml-4 shrink-0 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                          title="Copy address"
                        >
                          {copiedAddress === item.address ? (
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>
      )}

      {/* Empty State */}
      {!inputAddress.trim() && (
        <div className="rounded-lg border border-dashed border-gray-700 p-12 text-center">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <p className="text-gray-500">
            Enter a Substrate address above to see it converted to different network formats
          </p>
        </div>
      )}
    </div>
  );
}
