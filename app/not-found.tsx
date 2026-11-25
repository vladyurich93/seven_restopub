import Link from "next/link";
export default function NotFound() {
  return <section className="container-shell seven-inner-page min-h-[70vh] flex flex-col justify-center py-32">
    <p className="text-sm tracking-widest text-seven-terracotta">404 · SEVEN RESTOPUB</p>
    <h1 className="mt-5 max-w-2xl font-display text-5xl leading-tight md:text-7xl">Цю сторінку не знайдено.</h1>
    <p className="mt-5 max-w-xl leading-7 text-seven-muted">Але ваш Seven поруч. Оберіть заклад або перегляньте актуальне меню.</p>
    <div className="mt-8 flex flex-wrap gap-4"><Link className="seven-primary inline-flex min-h-12 items-center rounded-full px-6 py-3" href="/locations">Обрати заклад</Link><Link className="seven-text-link min-h-12" href="/menu">Переглянути меню</Link></div>
  </section>;
}
