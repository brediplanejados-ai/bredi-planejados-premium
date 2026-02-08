
import React, { useState, useEffect, useRef } from 'react';

interface ChatMessage {
    id: string;
    text: string;
    sender: 'assistant' | 'user';
    options?: string[];
    type?: 'text' | 'options' | 'input' | 'date' | 'time';
}

interface LeadData {
    clientType?: string;
    environments: string[];
    immobileStatus?: string;
    measuresStatus?: string;
    style?: string;
    investmentRange?: string;
    city?: string;
    name?: string;
    phone?: string;
    visitDate?: string;
    visitTime?: string;
    extraNote?: string;
}

const CalendarPicker: React.FC<{ onSelect: (date: string) => void }> = ({ onSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const startOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const renderDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const days = [];
        const totalDays = daysInMonth(year, month);
        const startDay = startOfMonth(year, month);

        // Fill empty days at the start
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
        }

        for (let d = 1; d <= totalDays; d++) {
            const date = new Date(year, month, d);
            const isToday = new Date().toDateString() === date.toDateString();
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

            days.push(
                <button
                    key={d}
                    disabled={isPast}
                    onClick={() => {
                        setSelectedDate(date);
                        const formatted = date.toISOString().split('T')[0];
                        onSelect(formatted);
                    }}
                    className={`w-8 h-8 rounded-full text-[10px] font-bold transition-all flex items-center justify-center ${isSelected ? 'bg-primary text-black' :
                        isToday ? 'border border-primary text-primary' :
                            isPast ? 'text-slate-700 cursor-not-allowed' : 'text-slate-300 hover:bg-white/10'
                        }`}
                >
                    {d}
                </button>
            );
        }
        return days;
    };

    const nextMonth = () => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
    const prevMonth = () => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));

    return (
        <div className="bg-black/60 border border-white/10 rounded-2xl p-4 mt-2 w-full max-w-[280px]">
            <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="text-primary hover:scale-110"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    {currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={nextMonth} className="text-primary hover:scale-110"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
                    <span key={d} className="text-[8px] font-black text-slate-600 mb-2">{d}</span>
                ))}
                {renderDays()}
            </div>
        </div>
    );
};

const TimePicker: React.FC<{
    onSelect: (time: string) => void,
    bookedSlots: string[],
    selectedDate: string
}> = ({ onSelect, bookedSlots, selectedDate }) => {
    const times = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

    const isBooked = (time: string) => {
        return bookedSlots.includes(`${selectedDate} ${time}`);
    };

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {times.map(t => {
                const disabled = isBooked(t);
                return (
                    <button
                        key={t}
                        disabled={disabled}
                        onClick={() => onSelect(t)}
                        className={`px-3 py-1 border text-[10px] font-bold rounded-lg transition-all ${disabled
                            ? 'bg-red-500/10 border-red-500/20 text-red-500/50 cursor-not-allowed line-through'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:border-primary hover:text-primary'
                            }`}
                    >
                        {t} {disabled && "(Ocupado)"}
                    </button>
                );
            })}
        </div>
    );
};

const TypingIndicator: React.FC = () => (
    <div className="flex gap-1 p-4 bg-white/5 border border-white/10 rounded-2xl w-16 mb-4">
        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
    </div>
);

const ChatAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);
    const [step, setStep] = useState(0);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [bookedSlots, setBookedSlots] = useState<string[]>([
        "2026-01-27 09:00", // Simulação de horários ocupados
        "2026-01-27 10:00",
        "2026-01-28 14:00"
    ]);
    const [leadData, setLeadData] = useState<LeadData>({
        environments: [],
    });
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);
    const leadDataRef = useRef<LeadData>(leadData);

    useEffect(() => {
        leadDataRef.current = leadData;
    }, [leadData]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            initChat();
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addMessage = (msg: Omit<ChatMessage, 'id'> & { id?: string }) => {
        const id = msg.id || Math.random().toString(36).substr(2, 9);
        setMessages(prev => [...prev, { ...msg, id }]);
    };

    const botRespond = (msg: Omit<ChatMessage, 'id'> & { id?: string }) => {
        setIsTyping(true);
        setTimeout(() => {
            addMessage(msg);
            setIsTyping(false);
        }, 2000);
    };

    const initChat = () => {
        botRespond({
            text: "Olá! 👋 Sou o assistente do Bredi Planejados 😊",
            sender: 'assistant'
        });
        setTimeout(() => {
            botRespond({
                text: "Estou aqui para te ajudar a solicitar um orçamento de móveis planejados, tirar dúvidas e até agendar uma visita com nossa equipe especializada.",
                sender: 'assistant'
            });
        }, 2000);
        setTimeout(() => {
            botRespond({
                text: "Como posso te ajudar hoje?",
                sender: 'assistant',
                options: [
                    "1️⃣ Solicitar orçamento",
                    "2️⃣ Ver ambientes que trabalhamos",
                    "3️⃣ Saber como funciona o processo",
                    "4️⃣ Valores e formas de pagamento",
                    "5️⃣ Falar com um especialista"
                ]
            });
        }, 4000);
    };


    const processNextStep = (userInput: string) => {
        const nextStep = step + 1;
        setStep(nextStep);

        // Branching based on initial selection or current step
        if (step === 0) {
            if (userInput.includes("1️⃣")) {
                setStep(101); // Quote Flow
                botRespond({
                    text: "Para começarmos, você é:",
                    sender: 'assistant',
                    options: ["🔹 Pessoa Física", "🔹 Empresa / Comércio"]
                });
            } else if (userInput.includes("2️⃣")) {
                botRespond({
                    text: "Trabalhamos com móveis planejados sob medida, incluindo:\n\n✔️ Cozinhas planejadas\n✔️ Quartos e closets\n✔️ Salas e painéis\n✔️ Banheiros\n✔️ Área gourmet\n✔️ Escritórios\n✔️ Projetos residenciais e comerciais",
                    sender: 'assistant'
                });
                setTimeout(() => {
                    botRespond({
                        text: "👉 Deseja solicitar um orçamento para algum deles?",
                        sender: 'assistant',
                        options: ["Solicitar orçamento", "Voltar ao menu"]
                    });
                }, 2000);
            } else if (userInput.includes("3️⃣")) {
                botRespond({
                    text: "Nosso processo é simples e seguro 😊\n\n1️⃣ Atendimento e levantamento das necessidades\n2️⃣ Projeto 3D personalizado\n3️⃣ Ajustes conforme sua aprovação\n4️⃣ Produção com materiais de alta qualidade\n5️⃣ Entrega e montagem especializada\n\n💡 Tudo feito sob medida para seu espaço.",
                    sender: 'assistant'
                });
                setTimeout(() => {
                    botRespond({
                        text: "Deseja falar com um especialista agora ou solicitar um orçamento?",
                        sender: 'assistant',
                        options: ["Solicitar orçamento", "Falar com especialista", "Voltar ao menu"]
                    });
                }, 3000);
            } else if (userInput.includes("4️⃣")) {
                botRespond({
                    text: "Os valores variam conforme:\n📐 Medidas\n🎨 Acabamentos\n🪵 Materiais escolhidos\n\n💳 Aceitamos:\n✔️ Pix\n✔️ Cartão de crédito\n✔️ Parcelamento facilitado",
                    sender: 'assistant'
                });
                setTimeout(() => {
                    botRespond({
                        text: "👉 Quer um orçamento personalizado?",
                        sender: 'assistant',
                        options: ["Sim, solicitar agora", "Falar com especialista", "Voltar ao menu"]
                    });
                }, 2000);
            } else if (userInput.includes("5️⃣")) {
                botRespond({
                    text: "Sem problemas 😊\nVou encaminhar seu atendimento para um especialista agora.\n\n📲 Você receberá uma mensagem no WhatsApp em instantes.",
                    sender: 'assistant'
                });
                setTimeout(() => {
                    const url = `https://wa.me/5515998148402?text=Olá, gostaria de falar com um especialista sobre móveis planejados.`;
                    window.open(url, '_blank');
                }, 2500);
            }
            return;
        }

        // Logic for "Voltar ao menu" or "Solicitar orçamento" from other branches
        if (userInput === "Voltar ao menu") {
            setStep(0);
            initChat();
            return;
        }
        if (userInput === "Solicitar orçamento" || userInput === "Sim, solicitar agora") {
            setStep(101);
            botRespond({
                text: "Para começarmos, você é:",
                sender: 'assistant',
                options: ["🔹 Pessoa Física", "🔹 Empresa / Comércio"]
            });
            return;
        }

        // Quote Flow (steps 101+)
        switch (step) {
            case 101: // TIPO DE CLIENTE
                setLeadData(prev => ({ ...prev, clientType: userInput }));
                setStep(102);
                botRespond({
                    text: "Qual ambiente você deseja planejar? (Pode escolher mais de um 😊)",
                    sender: 'assistant',
                    options: ["Cozinha", "Quarto", "Closet", "Sala", "Banheiro", "Área gourmet", "Escritório", "Outro"]
                });
                break;
            case 102: // AMBIENTE
                setLeadData(prev => ({ ...prev, environments: [...prev.environments, userInput] }));
                botRespond({
                    text: "Mais algum ambiente ou podemos prosseguir?",
                    sender: 'assistant',
                    options: ["Cozinha", "Quarto", "Closet", "Sala", "Banheiro", "Área gourmet", "Escritório", "Outro", "✅ Prosseguir"]
                });
                break;
            case 103: // SITUAÇÃO DO IMÓVEL (se userInput was Prosseguir, the switch will hit this)
                if (userInput !== "✅ Prosseguir") {
                    setLeadData(prev => ({ ...prev, environments: [...prev.environments, userInput] }));
                    setStep(102); // Keep in environment selection
                    return;
                }
                setStep(104);
                botRespond({
                    text: "Seu imóvel é:",
                    sender: 'assistant',
                    options: ["🏗️ Em construção", "🔑 Pronto para morar", "🔄 Em reforma"]
                });
                break;
            case 104: // MEDIDAS
                setLeadData(prev => ({ ...prev, immobileStatus: userInput }));
                setStep(105);
                botRespond({
                    text: "Você já possui as medidas do ambiente?",
                    sender: 'assistant',
                    options: ["🔹 Sim, já tenho", "🔹 Não, preciso de visita técnica"]
                });
                break;
            case 105: // ESTILO
                setLeadData(prev => ({ ...prev, measuresStatus: userInput }));
                setStep(106);
                botRespond({
                    text: "Qual estilo você mais gosta?",
                    sender: 'assistant',
                    options: ["🎨 Moderno", "🌿 Clean", "🪵 Amadeirado", "✨ Sofisticado / Luxo", "📐 Minimalista", "🤍 Ainda não sei"]
                });
                break;
            case 106: // INVESTIMENTO
                setLeadData(prev => ({ ...prev, style: userInput }));
                setStep(107);
                botRespond({
                    text: "Você tem uma faixa de investimento em mente? (Opcional)",
                    sender: 'assistant',
                    options: ["💰 Até R$ 10.000", "💰 R$ 10k a R$ 20k", "💰 R$ 20k a R$ 40k", "💰 Acima de R$ 40k", "💬 Prefiro conversar"]
                });
                break;
            case 107: // CIDADE
                setLeadData(prev => ({ ...prev, investmentRange: userInput }));
                setStep(108);
                botRespond({
                    text: "Em qual cidade o projeto será realizado?",
                    sender: 'assistant',
                    type: 'input'
                });
                break;
            case 108: // NOME
                setLeadData(prev => ({ ...prev, city: userInput }));
                setStep(109);
                botRespond({
                    text: "Perfeito 😊 Qual é o seu nome completo?",
                    sender: 'assistant',
                    type: 'input'
                });
                break;
            case 109: // WHATSAPP
                setLeadData(prev => ({ ...prev, name: userInput }));
                setStep(110);
                botRespond({
                    text: "Qual é o seu WhatsApp para contato? 📱",
                    sender: 'assistant',
                    type: 'input'
                });
                break;
            case 110: // CONFIRMAÇÃO RESUMO
                setLeadData(prev => ({ ...prev, phone: userInput }));
                setStep(111);
                botRespond({
                    text: `Ótimo! Já tenho todas as informações necessárias ✅\n\n📌 Resumo do pedido:\nAmbiente(s): ${leadData.environments.join(', ')}\nImóvel: ${leadData.immobileStatus}\nEstilo: ${leadData.style}\nCidade: ${leadData.city}`,
                    sender: 'assistant'
                });
                setTimeout(() => {
                    botRespond({
                        text: "👉 Deseja agendar uma visita ou atendimento online agora?",
                        sender: 'assistant',
                        options: ["✔️ Sim, agendar", "❌ Não, quero só o orçamento"]
                    });
                }, 3000);
                break;
            case 111: // AGENDAMENTO (calendar)
                if (userInput.includes("Sim")) {
                    setStep(201);
                    botRespond({
                        text: "Vamos agendar 😊 Escolha o melhor dia no calendário abaixo:",
                        sender: 'assistant',
                        type: 'date'
                    });
                } else {
                    finishChat();
                }
                break;
            case 201: // HORÁRIO
                setLeadData(prev => ({ ...prev, visitDate: userInput }));
                setStep(202);
                botRespond({
                    text: "Agora escolha o melhor horário:",
                    sender: 'assistant',
                    type: 'time'
                });
                break;
            case 202: // FINALIZAÇÃO AGENDADA
                setLeadData(prev => ({ ...prev, visitTime: userInput }));
                botRespond({
                    text: "✅ Agendamento confirmado!\n\nNosso especialista entrará em contato pelo WhatsApp 📲",
                    sender: 'assistant'
                });
                setTimeout(() => {
                    finishChat();
                }, 3000);
                break;
            default:
                break;
        }
    };


    const createCalendarEvent = async () => {
        const { name, phone, address, environments, visitDate, visitTime, projectStatus, extraNote } = leadData;

        const startTime = `${visitDate}T${visitTime}:00`;
        const endTime = `${visitDate}T${(parseInt(visitTime?.split(':')[0] || '0') + 1).toString().padStart(2, '0')}:${visitTime?.split(':')[1] || '00'}:00`;

        const eventData = {
            title: `Visita Técnica – Móveis Planejados (${name})`,
            description: `Cliente: ${name}\nTelefone: ${phone}\nEndereço: ${address}\nAmbientes: ${environments.join(', ')}\nProjeto: ${projectStatus}\nObs: ${extraNote}`,
            location: address,
            startTime,
            endTime,
            clientName: name,
            clientPhone: phone
        };

        console.log("Salvando no Google Agenda:", eventData);

        /**
         * NOTA PARA O DONO:
         * Por agora, os dados são preparados e incluídos no resumo final.
         */
    };

    const finishChat = () => {
        botRespond({
            text: "Prontinho! 😊 Sua solicitação foi registrada.",
            sender: 'assistant'
        });

        setTimeout(() => {
            botRespond({
                text: "Perfeito! Estou te redirecionando agora para o WhatsApp da Bredi Planejados... 🚀",
                sender: 'assistant'
            });

            setTimeout(() => {
                const url = `https://wa.me/5515998148402?text=${generateWhatsAppMessage()}`;
                window.open(url, '_blank');
            }, 3000);
        }, 3500);
    };

    const generateWhatsAppMessage = () => {
        const { name, phone, city, environments, immobileStatus, style, measuresStatus, visitDate, visitTime, extraNote } = leadDataRef.current;
        const msg = `📌 *NOVO LEAD – BREDI PLANEJADOS*

👤 *Cliente:* ${name || 'N/A'}
📱 *WhatsApp:* ${phone || 'N/A'}
📍 *Cidade:* ${city || 'N/A'}

🏠 *Ambiente(s):* ${environments.join(', ')}
🏗️ *Imóvel:* ${immobileStatus}
🎨 *Estilo:* ${style}
📏 *Medidas:* ${measuresStatus}

${visitDate ? `📅 *Visita Agendada:*\n🗓️ *Data:* ${visitDate}\n⏰ *Horário:* ${visitTime}\n` : '📅 *Visita:* Não agendada'}
📝 *Obs:* ${extraNote || 'Nenhuma'}`;

        return encodeURIComponent(msg);
    };

    const generateCalendarLink = () => {
        const { name, address, environments, visitDate, visitTime, extraNote } = leadData;
        if (!visitDate || !visitTime) return '';

        const dateStr = visitDate.replace(/-/g, '');
        const timeStr = visitTime.replace(/:/g, '');
        const start = `${dateStr}T${timeStr}00`;
        const end = `${dateStr}T${(parseInt(visitTime.split(':')[0]) + 1).toString().padStart(2, '0')}${visitTime.split(':')[1]}00`;

        const title = encodeURIComponent(`Visita Técnica – Móveis Planejados (${name})`);
        const details = encodeURIComponent(`Cliente: ${name}\nEndereço: ${address}\nAmbientes: ${environments.join(', ')}\nObs: ${extraNote}`);
        const location = encodeURIComponent(address || '');

        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${start}/${end}`;
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const text = inputValue;
        addMessage({ text, sender: 'user' });
        setInputValue('');

        const lastMsg = messages[messages.length - 1];
        processNextStep(text);
    };

    const handleOptionClick = (option: string) => {
        addMessage({ text: option, sender: 'user' });
        if (option === "🚀 ENVIAR RESUMO NO WHATSAPP") {
            const url = `https://wa.me/5515998148402?text=${generateWhatsAppMessage()}`;
            window.open(url, '_blank');
        } else if (option === "📅 SALVAR NO MEU GOOGLE AGENDA") {
            const url = generateCalendarLink();
            if (url) window.open(url, '_blank');
        } else {
            processNextStep(option);
        }
    };

    const triggerClickEffect = () => {
        setIsGlitching(true);
        setIsOpen(!isOpen);

        // Reproduzir o som de robô
        const audio = new Audio('/assets/sounds/robot-click.mp3');
        audio.play().catch(err => console.error("Erro ao tocar o som:", err));

        setTimeout(() => setIsGlitching(false), 500);
    };


    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                @keyframes glitch {
                    0% { transform: translate(0); clip-path: inset(0 0 0 0); }
                    20% { transform: translate(-2px, 2px); clip-path: inset(10% 0 30% 0); }
                    40% { transform: translate(2px, -2px); clip-path: inset(40% 0 10% 0); }
                    60% { transform: translate(-2px, 0); clip-path: inset(20% 0 50% 0); }
                    80% { transform: translate(2px, 2px); clip-path: inset(10% 0 20% 0); }
                    100% { transform: translate(0); clip-path: inset(0 0 0 0); }
                }
                .robot-float {
                    animation: float 3s ease-in-out infinite;
                }
                .robot-glitch {
                    animation: glitch 0.3s linear;
                }
            `}} />

            {/* FAB Trigger */}
            <button
                onClick={triggerClickEffect}
                className={`fixed bottom-24 right-6 md:bottom-10 md:right-10 z-[120] w-20 h-20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group ${!isOpen ? 'robot-float' : ''}`}
            >
                {isOpen ? (
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30">
                        <span className="material-symbols-outlined text-3xl text-primary">close</span>
                    </div>
                ) : (
                    <>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary/30 shadow-[0_0_15px_rgba(197,160,89,0.3)] pointer-events-none">
                            Assistente Virtual
                        </span>
                        <div className={`relative w-full h-full flex items-center justify-center ${isGlitching ? 'robot-glitch' : ''}`}>
                            <img
                                src="/robot-bredi.png?v=2"
                                alt="Assistente Robô"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </>
                )}

            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-44 right-6 md:bottom-32 md:right-10 z-[120] w-[90vw] md:w-[400px] h-[600px] bg-black/95 backdrop-blur-2xl border border-primary/20 rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
                {/* Header */}
                <div className="p-6 border-b border-primary/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center p-1.5 overflow-hidden">
                        <img
                            src="/robot-bredi.png?v=2"
                            alt="Assistente Robô"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <h3 className="font-black text-sm uppercase tracking-widest text-primary">Assistente Bredi</h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Bot Ativo</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="ml-auto w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-slate-500 hover:text-primary transition-all"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
                    {messages.map(msg => (
                        <div key={msg.id} className="flex flex-col gap-2">
                            <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-primary text-black font-bold' : 'bg-white/5 border border-white/10 text-slate-200 font-light'}`}>
                                    {msg.text}
                                </div>
                            </div>
                            {msg.type === 'date' && msg.sender === 'assistant' && (
                                <CalendarPicker onSelect={(date) => {
                                    handleOptionClick(date);
                                }} />
                            )}
                            {msg.type === 'time' && msg.sender === 'assistant' && (
                                <TimePicker
                                    selectedDate={leadData.visitDate || ''}
                                    bookedSlots={bookedSlots}
                                    onSelect={(time) => {
                                        handleOptionClick(time);
                                    }}
                                />
                            )}
                        </div>
                    ))}

                    {messages.length > 0 && messages[messages.length - 1].options && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {messages[messages.length - 1].options?.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => handleOptionClick(opt)}
                                    className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary text-xs font-bold rounded-full hover:bg-primary hover:text-black transition-all"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                    <div ref={chatEndRef} />
                    {isTyping && <TypingIndicator />}
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-primary/10">
                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Digite sua resposta..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-primary/50 outline-none transition-all"
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-primary"
                        >
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatAssistant;
