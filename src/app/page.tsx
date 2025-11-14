"use client";

import { useState } from "react";
import { Upload, CheckCircle2, Sparkles, Shield, Users, TrendingUp, Zap, Award, Clock, Star } from "lucide-react";

type Step = "home" | "quiz" | "photos" | "offer" | "success";

interface QuizAnswers {
  hairType: string;
  frizz: string;
  dryness: string;
  chemical: string;
  fallBreak: string;
  washFrequency: string;
  goal: string;
}

interface PhotosData {
  front: string | null;
  side: string | null;
  back: string | null;
}

export default function Capilizeia() {
  const [step, setStep] = useState<Step>("home");
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    hairType: "",
    frizz: "",
    dryness: "",
    chemical: "",
    fallBreak: "",
    washFrequency: "",
    goal: "",
  });
  const [photos, setPhotos] = useState<PhotosData>({
    front: null,
    side: null,
    back: null,
  });
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const quizQuestions = [
    {
      question: "Qual é o seu tipo de cabelo?",
      key: "hairType" as keyof QuizAnswers,
      options: ["Liso", "Ondulado", "Cacheado", "Crespo"],
    },
    {
      question: "Qual o nível de frizz do seu cabelo?",
      key: "frizz" as keyof QuizAnswers,
      options: ["Nenhum", "Leve", "Moderado", "Intenso"],
    },
    {
      question: "Seu cabelo está ressecado?",
      key: "dryness" as keyof QuizAnswers,
      options: ["Não", "Um pouco", "Bastante", "Muito ressecado"],
    },
    {
      question: "Você faz química no cabelo?",
      key: "chemical" as keyof QuizAnswers,
      options: ["Não", "Progressiva", "Tintura", "Descoloração"],
    },
    {
      question: "Você tem queda ou quebra?",
      key: "fallBreak" as keyof QuizAnswers,
      options: ["Não", "Queda leve", "Quebra nas pontas", "Ambos"],
    },
    {
      question: "Com que frequência você lava o cabelo?",
      key: "washFrequency" as keyof QuizAnswers,
      options: ["Todo dia", "Dia sim, dia não", "2-3x por semana", "1x por semana"],
    },
    {
      question: "Qual é o seu objetivo principal?",
      key: "goal" as keyof QuizAnswers,
      options: ["Brilho intenso", "Força e resistência", "Crescimento acelerado", "Redução de frizz"],
    },
  ];

  const handleQuizAnswer = (answer: string) => {
    const currentQuestion = quizQuestions[quizStep];
    setQuizAnswers({ ...quizAnswers, [currentQuestion.key]: answer });

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setTimeout(() => {
        setStep("photos");
      }, 500);
    }
  };

  const handlePhotoUpload = (type: keyof PhotosData, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotos({ ...photos, [type]: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const processPhotos = () => {
    setProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setProcessing(false);
            setStep("offer");
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const allPhotosUploaded = photos.front && photos.side && photos.back;

  // HOME SCREEN
  if (step === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B69FF] via-[#0B69FF]/90 to-[#0B69FF]/80 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#F5C84F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF1E1E] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        </div>

        <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-4xl w-full text-center space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide border-2 border-white/30 shadow-2xl">
              <Sparkles className="w-5 h-5" />
              <span>Diagnóstico Capilar Inteligente</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] drop-shadow-2xl">
                Seu cabelo pode mudar{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#F5C84F]">completamente</span>
                  <span className="absolute inset-0 bg-white/20 blur-xl"></span>
                </span>{" "}
                ainda hoje.
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl text-white/95 font-bold max-w-3xl mx-auto drop-shadow-lg">
                Com apenas <span className="text-[#FF1E1E] bg-white/20 px-3 py-1 rounded-lg">7 perguntas</span> e{" "}
                <span className="text-[#FF1E1E] bg-white/20 px-3 py-1 rounded-lg">3 fotos</span>, criamos seu cronograma
                perfeito.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => setStep("quiz")}
                className="group relative bg-[#FF1E1E] text-white px-14 py-7 rounded-2xl text-2xl sm:text-3xl font-black shadow-[0_20px_60px_rgba(255,30,30,0.5)] hover:shadow-[0_25px_70px_rgba(255,30,30,0.7)] transition-all duration-500 hover:scale-110 animate-pulse hover:animate-none border-4 border-white/30"
              >
                <span className="flex items-center gap-4 justify-center">
                  <Zap className="w-8 h-8" />
                  COMEÇAR AGORA
                  <span className="text-4xl group-hover:translate-x-3 transition-transform duration-300">➜</span>
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-8">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <CheckCircle2 className="w-6 h-6 text-[#F5C84F]" />
                <span className="text-white font-semibold text-lg">Sem compromisso</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Clock className="w-6 h-6 text-[#F5C84F]" />
                <span className="text-white font-semibold text-lg">Resultado em 2 minutos</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Award className="w-6 h-6 text-[#F5C84F]" />
                <span className="text-white font-semibold text-lg">12.000+ transformações</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // QUIZ SCREEN
  if (step === "quiz") {
    const currentQuestion = quizQuestions[quizStep];
    const progressPercent = ((quizStep + 1) / quizQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B69FF] via-[#0B69FF]/90 to-[#0B69FF]/80 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-4xl w-full space-y-8">
          {/* Progress Bar */}
          <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex justify-between text-base font-bold text-white">
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                Pergunta {quizStep + 1} de {quizQuestions.length}
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-4 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden shadow-lg border-2 border-white/30">
              <div
                className="h-full bg-gradient-to-r from-[#F5C84F] via-[#FF1E1E] to-[#F5C84F] transition-all duration-700 shadow-lg"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 border-4 border-[#F5C84F]/30">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 text-center leading-tight">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option}
                  onClick={() => handleQuizAnswer(option)}
                  className="group relative bg-gradient-to-br from-blue-50 to-amber-50 hover:from-[#0B69FF] hover:to-[#0B69FF] text-gray-900 hover:text-white p-7 rounded-2xl text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl border-3 border-gray-200 hover:border-[#F5C84F] overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/50 group-hover:bg-white/90 flex items-center justify-center font-black text-sm transition-colors">
                      {index + 1}
                    </span>
                    {option}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F5C84F] to-[#FF1E1E] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>

          {quizStep === quizQuestions.length - 1 && (
            <p className="text-center text-white text-xl font-bold animate-in fade-in duration-700 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 max-w-2xl mx-auto">
              ✨ Perfeito! Agora precisamos ver o que seu cabelo realmente precisa.
            </p>
          )}
        </div>
      </div>
    );
  }

  // PHOTOS SCREEN
  if (step === "photos") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B69FF] via-[#0B69FF]/90 to-[#0B69FF]/80 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-5xl w-full space-y-10">
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide border-2 border-white/30">
              <Upload className="w-5 h-5" />
              <span>Análise Profissional</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl">
              Agora precisamos ver seus fios
            </h2>
            <p className="text-2xl sm:text-3xl text-white/95 font-bold max-w-2xl mx-auto">
              Envie 3 fotos para uma análise precisa e personalizada
            </p>
          </div>

          {!processing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {[
                  { key: "front" as keyof PhotosData, label: "📸 Foto Frontal", emoji: "👤" },
                  { key: "side" as keyof PhotosData, label: "📸 Foto Lateral", emoji: "↔️" },
                  { key: "back" as keyof PhotosData, label: "📸 Foto de Trás", emoji: "🔄" },
                ].map(({ key, label, emoji }) => (
                  <div key={key} className="space-y-3">
                    <label className="block">
                      <div
                        className={`relative bg-white rounded-3xl border-4 border-dashed ${
                          photos[key] ? "border-[#27AE60]" : "border-white/40"
                        } p-8 text-center cursor-pointer hover:border-[#F5C84F] transition-all duration-300 hover:shadow-2xl hover:scale-105 group min-h-[320px] flex flex-col items-center justify-center`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePhotoUpload(key, file);
                          }}
                        />
                        {photos[key] ? (
                          <div className="space-y-4 w-full">
                            <img
                              src={photos[key]!}
                              alt={label}
                              className="w-full h-56 object-cover rounded-2xl shadow-lg"
                            />
                            <div className="flex items-center justify-center gap-2 text-[#27AE60] font-bold text-lg">
                              <CheckCircle2 className="w-6 h-6" />
                              <span>Enviada com sucesso!</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-5">
                            <div className="text-6xl">{emoji}</div>
                            <Upload className="w-16 h-16 mx-auto text-gray-400 group-hover:text-[#0B69FF] transition-colors" />
                            <div className="space-y-2">
                              <p className="font-black text-gray-900 text-xl">{label}</p>
                              <p className="text-base text-gray-600 font-semibold">Clique para enviar</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              {allPhotosUploaded && (
                <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <p className="text-2xl text-white font-bold bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 inline-block">
                    ✅ Perfeito! Todas as fotos foram enviadas.
                  </p>
                  <button
                    onClick={processPhotos}
                    className="bg-gradient-to-r from-[#F5C84F] to-[#FF1E1E] text-white px-14 py-7 rounded-2xl text-2xl sm:text-3xl font-black shadow-[0_20px_60px_rgba(245,200,79,0.5)] hover:shadow-[0_25px_70px_rgba(245,200,79,0.7)] transition-all duration-500 hover:scale-110 border-4 border-white/30"
                  >
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-8 h-8" />
                      ANALISAR AGORA
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-3xl shadow-2xl p-10 sm:p-16 space-y-10 text-center animate-in fade-in zoom-in duration-700 border-4 border-[#F5C84F]/30">
              <div className="relative">
                <Sparkles className="w-24 h-24 mx-auto text-[#F5C84F] animate-spin" />
                <div className="absolute inset-0 bg-[#F5C84F] blur-3xl opacity-30 animate-pulse"></div>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                Relaxe… estamos analisando a saúde REAL dos seus fios.
              </h3>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-[#F5C84F] via-[#FF1E1E] to-[#F5C84F] transition-all duration-300 shadow-lg relative overflow-hidden"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <p className="text-3xl font-black text-[#F5C84F]">{progress}%</p>
              </div>
              {progress === 100 && (
                <div className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border-4 border-[#27AE60] rounded-2xl p-8">
                    <p className="text-2xl text-gray-900 font-black leading-relaxed">
                      ✅ Diagnóstico pronto! Seu cabelo tem um potencial enorme — mas precisa da estratégia
                      certa.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // OFFER SCREEN
  if (step === "offer") {
    return (
      <div className="min-h-screen bg-white py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Headline */}
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF1E1E] to-[#F5C84F] text-white px-8 py-3 rounded-full text-sm font-black uppercase tracking-wide shadow-2xl animate-pulse">
              <Zap className="w-5 h-5" />
              🔥 OFERTA EXCLUSIVA - ACESSO IMEDIATO
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
              Seu cronograma capilar de 30 dias está{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#0B69FF]">PRONTO</span>
                <span className="absolute bottom-2 left-0 right-0 h-4 bg-[#F5C84F] -rotate-1"></span>
              </span>
              .
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#FF1E1E] drop-shadow-lg">
              Mas ele só será liberado após a confirmação.
            </p>
          </div>

          {/* Pain + Solution */}
          <div className="bg-gradient-to-br from-red-50 via-orange-50 to-red-50 border-4 border-[#FF1E1E] rounded-3xl p-8 sm:p-12 lg:p-16 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-2xl">
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-800 leading-relaxed font-semibold">
              Seu cabelo pode continuar{" "}
              <span className="font-black text-[#FF1E1E] bg-white/60 px-2 py-1 rounded">
                ressecado, fraco, com frizz e difícil de cuidar
              </span>
              …
            </p>
            <div className="text-center py-6">
              <span className="text-5xl sm:text-6xl font-black text-gray-400 drop-shadow-lg">OU</span>
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-800 leading-relaxed font-semibold">
              Você pode seguir um{" "}
              <span className="font-black text-[#0B69FF] bg-white/60 px-2 py-1 rounded">cronograma profissional</span> criado
              especialmente para você — com base nas suas fotos.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-blue-50 via-amber-50 to-blue-50 rounded-3xl p-8 sm:p-12 lg:p-16 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-2xl border-4 border-[#0B69FF]/30">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 text-center leading-tight">
              O que você ganha ao investir apenas{" "}
              <span className="text-[#0B69FF] bg-white/60 px-3 py-1 rounded-xl">R$ 11,90</span>:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Sparkles className="w-10 h-10" />,
                  title: "Acesso imediato ao APP CAPILIZEIA",
                  color: "from-[#0B69FF] to-blue-600",
                  textColor: "text-[#0B69FF]",
                },
                {
                  icon: <CheckCircle2 className="w-10 h-10" />,
                  title: "Cronograma Capilar Inteligente de 30 dias",
                  color: "from-[#F5C84F] to-amber-500",
                  textColor: "text-[#F5C84F]",
                },
                {
                  icon: <Users className="w-10 h-10" />,
                  title: "Grupo VIP no WhatsApp com dicas diárias",
                  color: "from-green-500 to-emerald-600",
                  textColor: "text-green-600",
                },
                {
                  icon: <TrendingUp className="w-10 h-10" />,
                  title: "Análise contínua do seu progresso",
                  color: "from-[#FF1E1E] to-red-600",
                  textColor: "text-[#FF1E1E]",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gray-100 overflow-hidden group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative flex items-start gap-5">
                    <div className={`${benefit.textColor} flex-shrink-0`}>{benefit.icon}</div>
                    <p className="text-xl font-black text-gray-900 leading-tight">{benefit.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-[#27AE60] rounded-3xl p-8 space-y-4 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Shield className="w-16 h-16 mx-auto text-[#27AE60]" />
                <p className="text-5xl font-black text-[#27AE60]">97%</p>
                <p className="text-base font-black text-gray-700">
                  Resultado visível nas primeiras 2 semanas
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-4 border-[#0B69FF] rounded-3xl p-8 space-y-4 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Users className="w-16 h-16 mx-auto text-[#0B69FF]" />
                <p className="text-5xl font-black text-[#0B69FF]">12.000+</p>
                <p className="text-base font-black text-gray-700">Mulheres já transformaram seus cabelos</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-4 border-[#F5C84F] rounded-3xl p-8 space-y-4 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Sparkles className="w-16 h-16 mx-auto text-[#F5C84F]" />
                <p className="text-5xl font-black text-[#F5C84F]">30 dias</p>
                <p className="text-base font-black text-gray-700">Para cabelo completamente transformado</p>
              </div>
            </div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { text: "Meu cabelo mudou completamente! Nunca imaginei que seria tão fácil.", name: "Ana Paula S." },
                { text: "Acabou o frizz! Finalmente encontrei algo que funciona de verdade.", name: "Juliana M." },
                { text: "Nunca mais fico perdida no que fazer! O cronograma é perfeito.", name: "Mariana L." },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white border-4 border-gray-200 rounded-2xl p-8 space-y-4 hover:border-[#F5C84F] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-[#F5C84F] text-[#F5C84F]" />
                    ))}
                  </div>
                  <p className="text-gray-800 font-bold text-lg italic leading-relaxed">"{testimonial.text}"</p>
                  <p className="text-sm text-gray-600 font-black">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pt-8">
            <div className="bg-gradient-to-r from-red-50 via-orange-50 to-red-50 border-4 border-[#FF1E1E] rounded-3xl p-8 sm:p-12 shadow-2xl">
              <a
                href="https://pay.kirvano.com/51e724bb-867f-4e51-aaa3-c00c66444833"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <button className="group relative w-full bg-gradient-to-r from-[#FF1E1E] to-[#FF1E1E]/90 text-white px-10 py-8 rounded-2xl text-2xl sm:text-3xl lg:text-4xl font-black shadow-[0_20px_60px_rgba(255,30,30,0.6)] hover:shadow-[0_30px_80px_rgba(255,30,30,0.8)] transition-all duration-500 hover:scale-105 animate-pulse hover:animate-none border-4 border-white">
                  <span className="flex items-center gap-4 justify-center flex-wrap">
                    <Zap className="w-10 h-10 flex-shrink-0" />
                    <span className="leading-tight">QUERO LIBERAR MEU CRONOGRAMA POR R$ 11,90</span>
                    <span className="text-5xl group-hover:translate-x-3 transition-transform duration-300 flex-shrink-0">➜</span>
                  </span>
                </button>
              </a>
              <div className="mt-6 space-y-3">
                <p className="text-base sm:text-lg text-gray-700 font-bold flex items-center justify-center gap-2 flex-wrap">
                  <Shield className="w-6 h-6 text-green-600" />
                  🔒 Pagamento 100% seguro via Kirvano
                </p>
                <p className="text-base sm:text-lg text-gray-700 font-bold flex items-center justify-center gap-2 flex-wrap">
                  <Zap className="w-6 h-6 text-[#F5C84F]" />
                  ⚡ Acesso imediato após confirmação
                </p>
              </div>
            </div>

            {/* Urgency */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-4 border-[#F5C84F] rounded-2xl p-6 inline-block shadow-xl">
              <p className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-3 flex-wrap justify-center">
                <Clock className="w-8 h-8 text-[#FF1E1E] animate-pulse" />
                ⏰ Oferta por tempo limitado - Garanta seu acesso agora!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SUCCESS SCREEN
  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-amber-50 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full text-center space-y-10 animate-in fade-in zoom-in duration-700">
          <div className="space-y-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-green-500 blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-full shadow-2xl">
                <CheckCircle2 className="w-24 h-24" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
              Pagamento aprovado! 🎉
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-700 font-bold">
              Seu acesso está sendo enviado para o seu email.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 sm:p-14 space-y-8 border-4 border-green-500/30">
            <p className="text-2xl sm:text-3xl font-black text-gray-900">Em até 30 segundos você receberá:</p>
            <div className="space-y-5">
              {[
                { icon: <Sparkles className="w-8 h-8" />, text: "Link do APP CAPILIZEIA", color: "text-[#0B69FF]" },
                { icon: <Users className="w-8 h-8" />, text: "Acesso ao Grupo VIP", color: "text-green-600" },
                { icon: <Award className="w-8 h-8" />, text: "Seu Cronograma Capilar Inteligente", color: "text-[#F5C84F]" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-5 bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <div className={`${item.color} flex-shrink-0`}>{item.icon}</div>
                  <p className="text-xl font-black text-gray-800 text-left">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6">
            <p className="text-lg text-gray-700 font-semibold">
              📧 Não recebeu? Verifique sua caixa de spam ou entre em contato conosco.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
