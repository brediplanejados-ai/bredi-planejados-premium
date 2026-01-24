
import React, { useState, useEffect } from 'react';
import {
    PROJECTS,
    TESTIMONIALS,
    PROCESS_STEPS,
    HERO_IMAGE,
    EXCLUSIVITY_IMAGE,
    FOUNDER_IMAGE,
    SOLUTIONS
} from './constants';

const Logo: React.FC<{ light?: boolean, centered?: boolean }> = ({ light = false, centered = false }) => (
    <a href="#inicio" className={`flex flex-col ${centered ? 'items-center' : 'items-start'} leading-tight gap-1 hover:opacity-80 transition-opacity`}>
        <span className="text-3xl font-bold tracking-[0.15em] gold-gradient-text">bRedi</span>
        <div className="w-full h-[1px] bg-primary opacity-60"></div>
        <span className={`text-xl font-serif ${light ? 'text-white' : 'text-slate-300'} italic tracking-wide`}>Planejados</span>
        <span className="text-[8px] font-medium tracking-[0.3em] text-white/50 uppercase">Móveis Sob Medida</span>
    </a>
);

const App: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Logo light={!scrolled} />

                    <div className="flex items-center gap-6">
                        <nav className="hidden lg:flex items-center gap-8 mr-8">
                            <a href="#inicio" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Início</a>
                            <a href="#portfolio" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Portfólio</a>
                            <a href="#processo" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Processo</a>
                            <a href="#cores" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Cores</a>
                        </nav>
                        <a
                            href="https://wa.me/5515998148402"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex bg-primary/10 text-primary border border-primary/40 px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all shadow-[0_0_20px_rgba(197,160,89,0.1)]"
                        >
                            Falar com Projetista
                        </a>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-white outline-none active:scale-90 transition-transform"
                        >
                            <span className="material-symbols-outlined text-4xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                {/* Hero Section */}
                <section id="inicio" className="relative h-[90vh] md:h-screen min-h-[600px] md:min-h-[800px] flex flex-col justify-end overflow-hidden pt-20 md:pt-32">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                        <div className="absolute inset-0 bg-black/30 z-10"></div>
                        <img
                            src={HERO_IMAGE}
                            alt="Luxury custom furniture"
                            className="w-full h-full object-cover scale-100 animate-[ken-burns_30s_infinite_alternate] brightness-75"
                        />
                    </div>

                    <div className="relative z-20 max-w-7xl mx-auto px-6 pb-20 md:pb-32 w-full">
                        <div className="max-w-4xl flex flex-col gap-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-primary/30 rounded-full w-fit">
                                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(197,160,89,0.8)] animate-pulse"></span>
                                <span className="text-primary text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Design de Luxo Sob Medida</span>
                            </div>

                            <h2 className="text-4xl md:text-8xl font-black leading-[1] md:leading-[0.95] tracking-tighter">
                                Ambientes que <br /><span className="gold-gradient-text italic font-serif font-light">Inspiram</span> sua Vida
                            </h2>

                            <p className="text-slate-200 text-base md:text-2xl leading-relaxed max-w-2xl font-light">
                                Criamos espaços exclusivos onde cada detalhe é planejado para refletir sua sofisticação e estilo. 100% fiel ao seu projeto 3D.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-4 md:mt-6">
                                <a
                                    href="https://wa.me/5515998148402"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-16 md:h-20 px-8 md:px-12 bg-primary text-black rounded-xl font-black text-xs md:text-sm tracking-[0.2em] uppercase shadow-[0_20px_50px_rgba(197,160,89,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 md:gap-4"
                                >
                                    Solicitar Projeto 3D Grátis
                                    <span className="material-symbols-outlined font-bold text-lg md:text-xl">arrow_forward</span>
                                </a>
                                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl group hover:bg-white/10 transition-colors cursor-default">
                                    <div className="bg-primary/20 p-2.5 rounded-full group-hover:bg-primary/30 transition-colors">
                                        <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black uppercase tracking-widest text-primary">Qualidade Bredi</span>
                                        <span className="text-xs text-slate-400">Materiais Certificados</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-black py-10 md:py-16 border-y border-white/10">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { val: '16', label: 'Anos de Tradição' },
                            { val: '500+', label: 'Projetos de Luxo' },
                            { val: '100%', label: 'Execução Fiel' },
                            { val: 'VRAY', label: 'Render Realista' }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col gap-1 md:gap-3 group">
                                <span className="gold-gradient-text font-black text-3xl md:text-5xl tracking-tighter group-hover:scale-110 transition-transform origin-left block">{stat.val}</span>
                                <p className="text-slate-500 text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-black">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Exclusivity Section - DIFERENCIAIS / CORES */}
                <section id="cores" className="py-16 md:py-32 bg-black px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-24 items-center">
                            <div className="relative">
                                <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[120px] opacity-50"></div>
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 aspect-[4/5] md:aspect-square">
                                    <img src={EXCLUSIVITY_IMAGE} alt="Exclusivity design" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent flex flex-col justify-end p-12">
                                        <div className="h-1 w-12 bg-primary mb-4"></div>
                                        <h3 className="text-4xl font-black leading-tight italic font-serif">A Arte de Morar Bem</h3>
                                    </div>
                                </div>
                                <div className="absolute -bottom-8 -right-8 bg-primary p-10 rounded-2xl hidden md:block shadow-2xl">
                                    <span className="material-symbols-outlined text-black text-5xl">handyman</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-12">
                                <div>
                                    <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-6 block">Nosso Diferencial</span>
                                    <h2 className="text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-tight">
                                        Precisão em cada <span className="gold-gradient-text">Milímetro</span>
                                    </h2>
                                    <p className="text-slate-400 text-xl leading-relaxed font-light">
                                        Diferente dos móveis modulados, os planejados Bredi são construídos especificamente para o seu espaço, garantindo aproveitamento máximo e estética impecável.
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-8">
                                    {[
                                        { title: 'Personalização', desc: 'Sua essência em cada gaveta.', icon: 'architecture' },
                                        { title: 'Tecnologia 3D', desc: 'Sem surpresas na montagem.', icon: 'view_in_ar' },
                                        { title: 'Acabamento', desc: 'Bordas e corrediças premium.', icon: 'brush' },
                                        { title: 'Pós-Venda', desc: 'Assistência técnica.', icon: 'support_agent' }
                                    ].map((f, i) => (
                                        <div key={i} className="flex flex-col gap-4 group cursor-default">
                                            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                                                <span className="material-symbols-outlined text-primary text-3xl">{f.icon}</span>
                                            </div>
                                            <h4 className="font-black text-lg tracking-tight">{f.title}</h4>
                                            <p className="text-slate-500 text-sm font-light leading-relaxed">{f.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery Solutions - PORTFÓLIO */}
                <section id="portfolio" className="py-16 md:py-32 bg-graphite px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                            <div className="max-w-xl">
                                <h2 className="text-5xl font-black mb-6">Ambientes <br /><span className="gold-gradient-text">Planejados</span></h2>
                                <div className="h-1 w-24 bg-primary rounded-full mb-6"></div>
                                <p className="text-slate-500 text-lg">Exploramos a harmonia entre materiais nobres e design inteligente em todos os cômodos.</p>
                            </div>
                            <a
                                href="#portfolio"
                                className="text-primary font-black uppercase tracking-[0.2em] text-xs flex items-center gap-2 group border-b border-primary/20 pb-2 hover:border-primary transition-all"
                            >
                                Ver Portfólio Completo
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                            </a>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {SOLUTIONS.map((sol, i) => (
                                <div key={i} className="group relative h-[500px] overflow-hidden rounded-3xl border border-white/5 shadow-2xl">
                                    <img src={sol.img} alt={sol.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-[0.6] group-hover:brightness-[0.8]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-10">
                                        <h4 className="text-white text-3xl font-black mb-2">{sol.title}</h4>
                                        <p className="gold-gradient-text text-[10px] font-black uppercase tracking-[0.4em] mb-4">{sol.subtitle}</p>
                                        <div className="w-0 group-hover:w-full h-0.5 bg-primary transition-all duration-700"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Timeline */}
                <section id="processo" className="py-16 md:py-32 px-6 bg-black overflow-hidden">
                    <div className="max-w-5xl mx-auto relative">
                        <div className="text-center mb-24 relative z-10">
                            <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] block mb-6">Metodologia Bredi</span>
                            <h2 className="text-5xl md:text-7xl font-black mb-8 italic font-serif">Do Sonho à Realidade</h2>
                            <p className="text-slate-500 text-xl max-w-2xl mx-auto font-light">Um processo rigoroso focado na excelência técnica e na sua tranquilidade.</p>
                        </div>

                        <div className="relative space-y-16">
                            {/* Vertical Line */}
                            <div className="absolute left-8 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block"></div>

                            {PROCESS_STEPS.map((step, i) => (
                                <div key={i} className="flex flex-col md:flex-row gap-10 md:gap-16 group relative">
                                    <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-black border border-primary/40 text-primary font-black shrink-0 transition-all group-hover:bg-primary group-hover:text-black group-hover:scale-110 shadow-2xl">
                                        <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                                    </div>
                                    <div className="flex-1 pb-10 border-b border-white/5 group-last:border-none">
                                        <span className="text-primary/40 text-5xl font-black font-serif italic absolute right-0 top-0 opacity-20 group-hover:opacity-100 transition-opacity">0{step.id}</span>
                                        <h4 className="text-3xl font-black mb-4 transition-colors group-hover:text-primary tracking-tight">{step.title}</h4>
                                        <p className="text-slate-400 leading-relaxed text-lg font-light max-w-2xl">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Founder Section */}
                <section className="py-24 md:py-32 bg-graphite px-6 overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="order-2 lg:order-1">
                                <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] block mb-6">Liderança & Visão</span>
                                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight">Quem está por trás da <span className="gold-gradient-text">bRedi?</span></h2>

                                <div className="space-y-8">
                                    <p className="text-slate-400 text-xl leading-relaxed font-light">
                                        Mais do que fabricar móveis, entregamos a realização de um sonho. Sob a liderança de quem vive a marcenaria de alto padrão há anos, cada projeto na bRedi é tratado com a exclusividade que você merece.
                                    </p>

                                    <div className="bg-black/40 p-8 rounded-2xl border border-white/5 backdrop-blur-xl">
                                        <p className="text-white italic text-lg font-serif mb-6">"Nossa missão é transformar ambientes através da precisão técnica e do design que inspira. Na bRedi, o que você vê no 3D é exatamente o que instalamos na sua casa."</p>
                                        <div>
                                            <h4 className="text-primary font-black uppercase tracking-widest text-sm">Diretoria Executiva</h4>
                                            <p className="text-slate-500 text-xs mt-1">Excelência comprovada em Itapeva e região.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <a
                                            href="https://wa.me/5515998148402"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="h-14 px-8 bg-primary/10 text-primary border border-primary/20 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-black transition-all flex items-center gap-3"
                                        >
                                            Falar com o Diretor
                                            <span className="material-symbols-outlined">chat</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="relative order-1 lg:order-2">
                                <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] opacity-30"></div>
                                <div className="relative aspect-square md:aspect-[4/5] rounded-[40px] overflow-hidden border-8 border-black shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-700">
                                    <img
                                        src={FOUNDER_IMAGE}
                                        alt="Liderança bRedi"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                </div>
                                <div className="absolute -bottom-6 -left-6 bg-primary text-black p-6 rounded-2xl shadow-2xl hidden md:block">
                                    <span className="font-black text-2xl tracking-tighter">16 Anos</span>
                                    <p className="text-[10px] font-black uppercase tracking-widest">de Experiência</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-24 md:py-40 px-6 relative overflow-hidden bg-black">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50"></div>
                    <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-12">
                        <Logo light centered />
                        <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter">
                            Vamos transformar seu <br /><span className="gold-gradient-text italic font-serif">Ambiente?</span>
                        </h2>
                        <a
                            href="https://wa.me/5515998148402"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-20 md:h-24 px-10 md:px-16 bg-primary text-black rounded-2xl font-black text-base md:text-lg tracking-[0.2em] uppercase shadow-[0_30px_60px_rgba(197,160,89,0.4)] hover:translate-y-[-10px] active:translate-y-0 transition-all flex items-center justify-center gap-4 md:gap-6 group"
                        >
                            Agendar Consultoria Exclusiva
                            <span className="material-symbols-outlined text-2xl md:text-3xl font-bold group-hover:translate-x-2 transition-transform">trending_flat</span>
                        </a>
                        <p className="text-slate-500 text-xs font-black uppercase tracking-[0.4em]">Atendimento personalizado para Itapeva e Região</p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-black py-24 px-6 border-t border-white/10 relative">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-20">
                    <div className="md:col-span-1">
                        <Logo light />
                        <p className="text-slate-500 mt-8 leading-relaxed font-light">Excelência em móveis sob medida. Tradição em transformar casas em lares de luxo.</p>
                    </div>

                    <div>
                        <h5 className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-8">Navegação</h5>
                        <ul className="flex flex-col gap-4 text-slate-400 font-medium">
                            <li><a href="#portfolio" className="hover:text-primary transition-colors">Portfólio 2024</a></li>
                            <li><a href="#cores" className="hover:text-primary transition-colors">Nossos Materiais</a></li>
                            <li><a href="#processo" className="hover:text-primary transition-colors">Processo de Execução</a></li>
                            <li><a href="https://wa.me/5515998148402" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Solicitar Orçamento</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h5 className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-8">Onde estamos</h5>
                        <div className="flex flex-col gap-6 text-slate-300">
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                <span className="font-light">Benedito Camargo Margarido, 230<br />Jardim Grajaú – Itapeva, SP</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-primary">phone_in_talk</span>
                                <a href="https://wa.me/5515998148402" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-primary transition-colors">15 998148402</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                <a href="mailto:brediplanejados@gmail.com" className="font-light hover:text-primary transition-colors">brediplanejados@gmail.com</a>
                            </div>
                        </div>

                        <div className="flex gap-6 mt-12">
                            {[
                                {
                                    name: 'Instagram',
                                    href: 'https://instagram.com/brediplanejados',
                                    icon: (
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Facebook',
                                    href: 'https://facebook.com/brediplanejados',
                                    icon: (
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.181c0-.598.237-.819.82-.819h3.18v-5h-4.045c-2.86 0-5.115 1.415-5.115 4.885v3.115z" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'E-mail',
                                    href: 'mailto:brediplanejados@gmail.com',
                                    icon: <span className="material-symbols-outlined text-2xl">mail</span>
                                }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all group relative"
                                    title={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col items-center gap-10 text-slate-500 text-[11px] font-bold uppercase tracking-[0.3em]">
                    <a
                        href="https://wa.me/5515998148402"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-200 hover:text-primary transition-all flex flex-col md:flex-row items-center gap-2 md:gap-3 normal-case tracking-wide py-3 px-8 bg-white/5 rounded-full border border-white/10 hover:border-primary/50 text-center order-1 md:order-2 shadow-2xl"
                    >
                        <span>Site desenvolvido por <span className="font-black text-primary">Agência bRedi</span></span>
                        <span className="hidden md:block opacity-20">•</span>
                        <span className="font-semibold italic">WhatsApp 15 99814-8402</span>
                    </a>

                    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 order-2 md:order-1">
                        <span>© 2024 bRedi Planejados - DESIGN PREMIUM</span>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                            <a href="#" className="hover:text-white transition-colors">Termos</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* WhatsApp FAB */}
            <a
                href="https://wa.me/5515998148402"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-[110] w-20 h-20 bg-[#25D366] text-white rounded-3xl shadow-[0_20px_40px_rgba(37,211,102,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
            >
                <span className="material-symbols-outlined text-4xl fill-1 group-hover:rotate-12 transition-transform">chat</span>
                <span className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-4 border-black font-bold">1</span>
            </a>

            {/* Mobile Fullscreen Menu */}
            <div className={`fixed inset-0 z-[115] bg-black/98 backdrop-blur-2xl transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col items-center justify-center h-full gap-10">
                    <Logo light centered />
                    <nav className="flex flex-col items-center gap-8">
                        <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black uppercase tracking-widest hover:text-primary transition-colors">Início</a>
                        <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black uppercase tracking-widest hover:text-primary transition-colors">Portfólio</a>
                        <a href="#processo" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black uppercase tracking-widest hover:text-primary transition-colors">Processo</a>
                        <a href="#cores" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black uppercase tracking-widest hover:text-primary transition-colors">Cores</a>
                    </nav>
                    <a
                        href="https://wa.me/5515998148402"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-black px-10 py-5 rounded-xl font-black uppercase tracking-widest shadow-2xl"
                    >
                        Falar com Projetista
                    </a>
                </div>
            </div>

            {/* Mobile Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-[110] md:hidden bg-black/80 backdrop-blur-2xl border-t border-white/10 px-6 pt-4 pb-10 flex justify-between items-center">
                {[
                    { icon: 'home', label: 'Home', href: '#inicio' },
                    { icon: 'dashboard', label: 'Projetos', href: '#portfolio' },
                    { icon: 'palette', label: 'Cores', href: '#cores' },
                    { icon: 'phone_in_talk', label: 'Contato', href: 'https://wa.me/5515998148402' }
                ].map((item, i) => (
                    <a key={i} href={item.href} className={`flex flex-col items-center gap-2 ${i === 0 ? 'text-primary' : 'text-slate-500'}`}>
                        <span className={`material-symbols-outlined ${i === 0 ? 'fill-1' : ''}`}>{item.icon}</span>
                        <span className="text-[8px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                    </a>
                ))}
            </nav>

            <style>{`
                @keyframes ken-burns {
                    from { transform: scale(1); }
                    to { transform: scale(1.15); }
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default App;
