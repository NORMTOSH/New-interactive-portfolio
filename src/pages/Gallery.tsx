// src/pages/Gallery.tsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    BadgeInfo,
    ExternalLink,
    Filter,
    Grid3X3,
    Palette,
    Sparkles,
    Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { LOGOS, CATEGORIES, type LogoItem } from "@/data/Gallery";


function LogoPreview({ item }: { item: LogoItem }) {
    return (
        <div className="relative flex h-52 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 p-6">
            <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} />
            <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_28%)]" />

            {item.image ? (
                <img
                    src={item.image}
                    alt={`${item.brand} logo`}
                    className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]"
                />
            ) : (
                <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-3xl border border-white/15 bg-white/5 text-3xl font-semibold tracking-[0.2em] text-white/90 backdrop-blur-md">
                    {item.brand.slice(0, 2).toUpperCase()}
                </div>
            )}
        </div>
    );
}

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedItem, setSelectedItem] = useState<LogoItem | null>(null);

    const filteredItems = useMemo(() => {
        if (activeCategory === "All") return LOGOS;
        return LOGOS.filter((item) => item.category === activeCategory);
    }, [activeCategory]);

    return (
        <main className="min-h-screen bg-[#070707] text-white">
            <Navbar />

            <section className="relative overflow-hidden border-b border-white/10 pt-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_40%)]" />
                <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                        <Sparkles className="h-4 w-4 text-cyan-300" />
                        <span className="text-xs font-medium uppercase tracking-[0.28em] text-white/70">
                            Logo Gallery
                        </span>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                        <div>
                            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Graphic design showcase with logos and identity systems.
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                                A clean gallery page to present logo work, brand marks, and visual identity concepts in a premium portfolio format.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3 lg:justify-self-end">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                                <div className="flex items-center gap-2 text-white/55">
                                    <Grid3X3 className="h-4 w-4" />
                                    <span className="text-xs uppercase tracking-[0.25em]">Projects</span>
                                </div>
                                <p className="mt-3 text-3xl font-semibold">{LOGOS.length}</p>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                                <div className="flex items-center gap-2 text-white/55">
                                    <Palette className="h-4 w-4" />
                                    <span className="text-xs uppercase tracking-[0.25em]">Styles</span>
                                </div>
                                <p className="mt-3 text-3xl font-semibold">{CATEGORIES.length - 1}</p>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                                <div className="flex items-center gap-2 text-white/55">
                                    <Star className="h-4 w-4" />
                                    <span className="text-xs uppercase tracking-[0.25em]">Focus</span>
                                </div>
                                <p className="mt-3 text-3xl font-semibold">Branding</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-3 text-white/70">
                        <Filter className="h-4 w-4" />
                        <span className="text-sm uppercase tracking-[0.24em]">Filter by category</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((category) => {
                            const active = activeCategory === category;
                            return (
                                <Button
                                    key={category}
                                    variant={active ? "default" : "outline"}
                                    onClick={() => setActiveCategory(category)}
                                    className={
                                        active
                                            ? "rounded-full"
                                            : "rounded-full border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
                                    }
                                >
                                    {category}
                                </Button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: index * 0.04 }}
                        >
                            <Card className="group h-full overflow-hidden border-white/10 bg-white/[0.03] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:border-white/20">
                                <CardContent className="p-4">
                                    <LogoPreview item={item} />

                                    <div className="mt-4 flex items-start justify-between gap-4">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="text-lg font-semibold text-white">{item.name}</h2>
                                                <Badge
                                                    variant="secondary"
                                                    className="rounded-full border border-white/10 bg-white/5 text-white/70"
                                                >
                                                    {item.year}
                                                </Badge>
                                            </div>
                                            <p className="mt-1 text-sm uppercase tracking-[0.22em] text-white/45">
                                                {item.brand}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="rounded-full border-white/10 bg-white/5 text-white/65"
                                        >
                                            {item.category}
                                        </Badge>
                                    </div>

                                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/65">
                                        {item.description}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-5 flex items-center justify-between gap-3">
                                        <Button
                                            variant="ghost"
                                            onClick={() => setSelectedItem(item)}
                                            className="px-0 text-white/75 hover:bg-transparent hover:text-white"
                                        >
                                            <BadgeInfo className="mr-2 h-4 w-4" />
                                            View details
                                        </Button>

                                        <Button
                                            variant="outline"
                                            className="rounded-full border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Open
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center text-white/60">
                        No logos found in this category.
                    </div>
                )}
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-10">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8 lg:p-10">
                    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div>
                            <p className="flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-white/55">
                                <ArrowRight className="h-4 w-4" />
                                Next step
                            </p>
                            <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                                Add motion, case studies, and downloadable brand sheets.
                            </h3>
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                                This page can grow into a full branding portfolio with brand stories, process shots, identity guidelines, and image carousels for each project.
                            </p>
                        </div>

                        <Button className="rounded-full px-6">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Featured Work
                        </Button>
                    </div>
                </div>
            </section>

            <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
                <DialogContent className="max-w-3xl border-white/10 bg-zinc-950 text-white">
                    {selectedItem && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl">{selectedItem.name}</DialogTitle>
                                <DialogDescription className="text-white/60">
                                    {selectedItem.brand} • {selectedItem.category} • {selectedItem.year}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                                <LogoPreview item={selectedItem} />
                                <div className="space-y-4">
                                    <p className="leading-relaxed text-white/70">{selectedItem.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedItem.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="rounded-full border border-white/10 bg-white/5 text-white/70"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60">
                                        Use this area for a short case study, brand rationale, or the design goals behind the logo.
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <Footer />
        </main>
    );
}