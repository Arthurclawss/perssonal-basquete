import { ArrowUp, AtSign } from "lucide-react";

const instagramUrl = "https://www.instagram.com/coachrafaelmelo/";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-black text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center bg-brand-red font-heading text-sm font-black tracking-[-0.08em]">HM</span>
            <div>
              <p className="font-heading text-lg font-black uppercase tracking-[0.06em]">Rafael Melo</p>
              <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.23em] text-white/40">Hoop Master Performance Esportiva</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white">
              <AtSign className="h-4 w-4" />
              Instagram
            </a>
            <a href="#inicio" className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white">
              Voltar ao topo
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-white/30 sm:flex-row">
          <p>© {new Date().getFullYear()} Rafael Melo</p>
          <p>Método · Disciplina · Performance</p>
        </div>
      </div>
    </footer>
  );
}
