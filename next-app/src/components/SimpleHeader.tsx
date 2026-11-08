"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/contact";
import { WhatsAppIcon } from "./WhatsAppButton";
import styles from "./SimpleHeader.module.css";

const links = [
  { label: "Resultados", id: "resultados", detail: "Experiência em quadra" },
  { label: "Campeonatos", id: "campeonatos", detail: "Trabalho e conquistas" },
  { label: "Sobre Rafael", id: "sobre", detail: "Conheça o treinador" },
  { label: "Treinos", id: "treinos", detail: "Evolução na prática" },
  { label: "Depoimentos", id: "depoimentos", detail: "A voz dos atletas" },
  { label: "Contato", id: "contato", detail: "Sua próxima etapa" },
];

export default function SimpleHeader() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  return (
    <header className={styles.header} onKeyDown={event => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }}>
      <div className={styles.row}>
        <a href="#inicio" className={styles.brand} aria-label="Rafael Melo — início" onClick={() => setOpen(false)}>
          <Image src="/assets/hoop-master-logo.png" alt="" width={48} height={48} />
          <span>Rafael Melo<small>Performance esportiva</small></span>
        </a>
        <button ref={buttonRef} type="button" className={styles.toggle} aria-expanded={open} aria-controls={panelId} aria-label={open ? "Fechar navegação" : "Abrir navegação"} onClick={() => setOpen(value => !value)}>
          <span>{open ? "Fechar" : "Menu"}</span>
          {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </button>
      </div>
      <div id={panelId} hidden={!open} className={styles.panel}>
        <div className={styles.caption}><span>Explore a Hoop Master</span><span>01 — 06</span></div>
        <nav aria-label="Navegação principal" className={styles.nav}>
          {links.map((link, index) => <a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)}>
            <span className={styles.number}>0{index + 1}</span>
            <span className={styles.copy}><strong>{link.label}</strong><small>{link.detail}</small></span>
            <ChevronRight className={styles.chevron} size={18} aria-hidden="true" />
          </a>)}
        </nav>
        <a className={styles.contact} href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className={styles.whatsApp} />
          <span>Vamos falar sobre seu treino<small>Converse com Rafael no WhatsApp</small></span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
