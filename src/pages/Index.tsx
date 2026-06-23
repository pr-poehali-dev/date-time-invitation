import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Calendar } from '@/components/ui/calendar';
import { ru } from 'date-fns/locale';

const TIME_GROUPS = [
  {
    label: 'Утро',
    emoji: '🌅',
    slots: ['08:00', '09:00', '10:00', '11:00'],
  },
  {
    label: 'День',
    emoji: '☀️',
    slots: ['12:00', '13:00', '14:00', '15:00', '16:00'],
  },
  {
    label: 'Вечер',
    emoji: '🌆',
    slots: ['17:00', '18:00', '19:00', '20:00'],
  },
  {
    label: 'Закат и ночь',
    emoji: '🌙',
    slots: ['20:30', '21:00', '22:00', '23:00'],
  },
];

const FloatingHearts = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 22,
        duration: 9 + Math.random() * 10,
        delay: Math.random() * 8,
        opacity: 0.25 + Math.random() * 0.4,
        emoji: ['🌸', '💕', '🤍', '🌷', '✿'][Math.floor(Math.random() * 5)],
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute top-0 animate-fall"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};

const Index = () => {
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);

  const next = () => setStep((s) => s + 1);

  const formattedDate = date
    ? date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
    : '';

  return (
    <div className="romantic-bg relative min-h-screen overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16">
        <div className="w-full max-w-xl">
          {/* Step 0 — Приглашение */}
          {step === 0 && (
            <div className="flex flex-col items-center text-center">
              <span className="mb-6 inline-block animate-float text-6xl">🤍</span>
              <p
                className="mb-4 animate-fade-up font-hand text-3xl text-primary opacity-0"
                style={{ animationDelay: '0.1s' }}
              >
                Привет, Юля
              </p>
              <h1
                className="mb-6 animate-fade-up font-serif text-5xl font-medium leading-tight text-foreground opacity-0 md:text-6xl"
                style={{ animationDelay: '0.3s' }}
              >
                У меня есть<br />
                <span className="text-glow italic text-primary">маленький вопрос…</span>
              </h1>
              <p
                className="mb-10 max-w-md animate-fade-up font-serif text-xl text-muted-foreground opacity-0"
                style={{ animationDelay: '0.5s' }}
              >
                Я очень хочу провести с тобой время. Позволишь пригласить тебя на прогулку?
              </p>

              {!confirmed ? (
                <div
                  className="flex animate-fade-up gap-4 opacity-0"
                  style={{ animationDelay: '0.7s' }}
                >
                  <button
                    onClick={() => setConfirmed(true)}
                    className="group rounded-full bg-primary px-10 py-4 font-serif text-xl text-primary-foreground soft-shadow transition-all duration-300 hover:scale-105 hover:brightness-105"
                  >
                    Да 🤍
                  </button>
                  <button
                    onClick={() => {}}
                    className="rounded-full border-2 border-border bg-card px-10 py-4 font-serif text-xl text-muted-foreground transition-all duration-300 hover:scale-105 hover:border-primary"
                  >
                    Нет
                  </button>
                </div>
              ) : (
                <div className="flex animate-scale-in flex-col items-center gap-6">
                  <p className="font-hand text-3xl text-primary">Ты серьёзно согласна? 🥺</p>
                  <button
                    onClick={next}
                    className="group rounded-full bg-primary px-10 py-4 font-serif text-xl text-primary-foreground soft-shadow transition-all duration-300 hover:scale-105 hover:brightness-105"
                  >
                    Да, серьёзно!
                    <Icon
                      name="Sparkles"
                      className="ml-2 inline-block transition-transform group-hover:scale-125"
                      size={20}
                    />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 1 — Выбор даты */}
          {step === 1 && (
            <div className="flex animate-scale-in flex-col items-center text-center">
              <span className="mb-4 text-5xl">📅</span>
              <p className="mb-2 font-hand text-3xl text-primary">Шаг первый</p>
              <h2 className="mb-8 font-serif text-4xl font-medium text-foreground">
                Какой день выберем?
              </h2>
              <div className="rounded-3xl bg-card p-4 soft-shadow">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ru}
                  disabled={{ before: new Date() }}
                  className="pointer-events-auto"
                />
              </div>
              <button
                onClick={next}
                disabled={!date}
                className="mt-8 rounded-full bg-primary px-10 py-4 font-serif text-xl text-primary-foreground soft-shadow transition-all duration-300 hover:scale-105 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {date ? `Прекрасно, ${formattedDate}` : 'Выбери дату'}
                <Icon name="ArrowRight" className="ml-2 inline-block" size={18} />
              </button>
            </div>
          )}

          {/* Step 2 — Выбор времени */}
          {step === 2 && (
            <div className="flex animate-scale-in flex-col items-center text-center">
              <span className="mb-4 text-5xl">🕊️</span>
              <p className="mb-2 font-hand text-3xl text-primary">Шаг второй</p>
              <h2 className="mb-8 font-serif text-4xl font-medium text-foreground">
                В какое время удобно?
              </h2>
              <div className="flex max-h-[55vh] w-full flex-col gap-6 overflow-y-auto rounded-3xl bg-card/60 p-5 soft-shadow">
                {TIME_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="mb-3 flex items-center gap-2 font-hand text-2xl text-primary">
                      <span className="text-xl">{group.emoji}</span>
                      {group.label}
                    </p>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {group.slots.map((slot) => {
                        const value = `${group.label} · ${slot}`;
                        return (
                          <button
                            key={slot}
                            onClick={() => setTime(value)}
                            className={`rounded-2xl border-2 px-3 py-3 font-serif text-lg transition-all duration-300 hover:scale-[1.05] ${
                              time === value
                                ? 'border-primary bg-primary text-primary-foreground shadow-md'
                                : 'border-border bg-card text-foreground hover:border-primary'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={next}
                disabled={!time}
                className="mt-8 rounded-full bg-primary px-10 py-4 font-serif text-xl text-primary-foreground soft-shadow transition-all duration-300 hover:scale-105 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Готово
                <Icon name="Sparkles" className="ml-2 inline-block" size={18} />
              </button>
            </div>
          )}

          {/* Step 3 — Финал */}
          {step === 3 && (
            <div className="flex animate-scale-in flex-col items-center text-center">
              <span className="mb-6 inline-block animate-heartbeat text-7xl">🤍</span>
              <h2 className="mb-8 font-serif text-5xl font-medium leading-tight text-foreground">
                Я буду ждать<br />этой прогулки<br />
                <span className="text-glow italic text-primary">и не просплю)</span>
              </h2>
              <div className="w-full rounded-3xl bg-card p-8 soft-shadow">
                <div className="mb-5 flex items-center justify-center gap-3 font-serif text-2xl text-foreground">
                  <Icon name="CalendarHeart" className="text-primary" size={26} />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center justify-center gap-3 font-serif text-2xl text-foreground">
                  <Icon name="Clock" className="text-primary" size={26} />
                  <span>{time}</span>
                </div>
              </div>
              <p className="mt-8 max-w-sm font-serif text-xl italic text-muted-foreground">
                Спасибо, что сказала «да». Ты делаешь обычный день — особенным. 🌷
              </p>
            </div>
          )}

          {/* Прогресс-точки */}
          {step < 3 && (
            <div className="mt-12 flex justify-center gap-2.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    step === i ? 'w-8 bg-primary' : 'w-2.5 bg-primary/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;