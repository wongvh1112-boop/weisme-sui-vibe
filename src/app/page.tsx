"use client";

import { ConnectButton } from "@mysten/dapp-kit";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";

const PACKAGE_ID =
  "0x824a47ebc8c1578946e017b612a7b9d096c239e5bc076a1ad873c9d4809807a4";
const MODULE = "vibe_check";
const FUNCTION = "write_note";

const PARTICLE_COUNT = 72;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: (i * 17 + 13) % 100,
  y: (i * 23 + 7) % 100,
  size: 1 + (i % 4),
  duration: 8 + (i % 18),
  delay: i * 0.25,
  opacityMin: 0.08 + (i % 5) * 0.06,
  opacityMax: 0.25 + (i % 4) * 0.12,
}));

export default function Home() {
  const [vibe, setVibe] = useState("");
  const [successDigest, setSuccessDigest] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction({
    onSuccess: (result) => {
      const digest =
        "digest" in result ? result.digest : (result as { effects?: { bcs?: string } }).effects?.bcs ?? null;
      if (digest) setSuccessDigest(digest);
      setErrorMessage(null);
    },
    onError: (err) => {
      setErrorMessage(err.message ?? "Transaction failed");
      setSuccessDigest(null);
    },
  });

  const handleSubmit = useCallback(() => {
    setSuccessDigest(null);
    setErrorMessage(null);
    const trimmed = vibe.trim();
    if (!trimmed) {
      setErrorMessage("Please enter your vibe.");
      return;
    }

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE}::${FUNCTION}`,
      arguments: [tx.pure.string(trimmed)],
    });

    signAndExecute({ transaction: tx });
  }, [vibe, signAndExecute]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] flex flex-col overflow-hidden relative">
      {/* Cyberpunk animated background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Synthwave perspective grid */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[75%] origin-bottom"
          style={{ perspective: "320px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[240%] flex items-end justify-center"
            style={{
              transform: "translateX(-50%) rotateX(68deg) scale(1.6)",
              transformStyle: "preserve-3d",
            }}
            animate={{ y: [0, -120] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2.5,
              ease: "linear",
            }}
          >
            <svg
              className="w-full opacity-[0.35]"
              viewBox="0 0 500 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gridStrokeA" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="gridStrokeB" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              {Array.from({ length: 28 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1={0}
                  y1={i * 10}
                  x2={500}
                  y2={i * 10}
                  stroke="url(#gridStrokeA)"
                  strokeWidth="0.6"
                />
              ))}
              {Array.from({ length: 33 }).map((_, i) => {
                const x = (i - 16) * 16;
                return (
                  <line
                    key={`v-${i}`}
                    x1={250 + x}
                    y1={0}
                    x2={250 + x * 2.2}
                    y2={280}
                    stroke="url(#gridStrokeB)"
                    strokeWidth="0.5"
                  />
                );
              })}
            </svg>
          </motion.div>
        </motion.div>

        {/* Pulsing neon orbs */}
        <motion.div
          className="absolute w-[min(85vw,420px)] h-[min(85vw,420px)] rounded-full blur-[110px] -left-[12%] top-[10%]"
          style={{ background: "#a855f7" }}
          animate={{
            x: [0, 40, -25, 0],
            y: [0, -30, 20, 0],
            opacity: [0.2, 0.45, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 22,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[min(75vw,380px)] h-[min(75vw,380px)] rounded-full blur-[110px] -right-[8%] top-[45%]"
          style={{ background: "#06b6d4" }}
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 25, -20, 0],
            opacity: [0.18, 0.42, 0.18],
            scale: [1, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 26,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[min(55vw,300px)] h-[min(55vw,300px)] rounded-full blur-[100px] left-[25%] bottom-[0%]"
          style={{ background: "#a855f7" }}
          animate={{
            x: [0, -25, 30, 0],
            y: [0, 35, -15, 0],
            opacity: [0.15, 0.38, 0.15],
            scale: [1, 1.18, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#06b6d4]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 6px currentColor",
            }}
            animate={{
              y: ["0vh", "-130vh"],
              x: [0, (p.id % 2 === 0 ? 1 : -1) * 45],
              opacity: [p.opacityMax, p.opacityMin, p.opacityMax],
            }}
            transition={{
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* CRT scanline overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
        aria-hidden
      />

      {/* Top nav */}
      <header className="relative z-10 border-b border-[#a855f7]/30 bg-[#050505]/90 backdrop-blur-sm sticky top-0">
        <div className="max-w-4xl mx-auto px-4 min-h-[5rem] sm:min-h-[5.5rem] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="WEISME SUI VIBE FEST"
              width={60}
              height={60}
              className="rounded-full ring-2 ring-[#a855f7]/80 shadow-[0_0_15px_rgba(168,85,247,0.7),0_0_25px_rgba(168,85,247,0.4)] flex-shrink-0"
            />
            <span className="font-bold text-2xl sm:text-4xl tracking-widest text-[#a855f7] drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] leading-tight">
              WEISME SUI VIBE FEST
            </span>
          </div>
          <ConnectButton />
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-xl"
        >
          <div className="relative rounded-xl border-2 border-[#a855f7]/50 bg-[#0a0a0a] p-6 sm:p-8 shadow-[0_0_30px_rgba(168,85,247,0.15),inset_0_1px_0_rgba(6,182,212,0.1)]">
            <div className="absolute inset-0 rounded-xl pointer-events-none border border-[#06b6d4]/20 shadow-[0_0_60px_rgba(6,182,212,0.08)]" />

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-xl sm:text-2xl font-bold tracking-wider text-[#06b6d4] mb-6 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            >
              EXPRESS YOUR VIBE
            </motion.h2>

            <textarea
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              placeholder="Type your vibe here..."
              rows={5}
              className="w-full rounded-lg border-2 border-[#a855f7]/40 bg-[#050505] px-4 py-3 text-[#e5e5e5] placeholder:text-gray-500 focus:outline-none focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 focus:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all resize-none"
              disabled={isPending}
            />

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(168,85,247,0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isPending}
              className="mt-6 w-full rounded-lg bg-[#a855f7] py-4 font-bold tracking-wider text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {isPending ? "SENDING..." : "Mint Vibe"}
            </motion.button>

            <AnimatePresence mode="wait">
              {successDigest && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 rounded-lg border border-[#06b6d4]/50 bg-[#06b6d4]/10 px-4 py-3 text-sm text-[#06b6d4]"
                >
                  ✓ Success! Digest:{" "}
                  <span className="font-mono break-all">{successDigest}</span>
                </motion.div>
              )}
              {errorMessage && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  ✕ {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 py-4 text-center text-sm text-gray-500">
        Powered by Sui & Slush
      </footer>
    </div>
  );
}
