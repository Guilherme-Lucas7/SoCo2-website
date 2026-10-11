"use client";

import { useEffect, useMemo, useState } from "react";

type Produto = {
  nome: string; formula: string; categoria: string; imagem: string;
  tamanhos: string[]; faixa: string; descricao: string;
};

const seis = ["1 m³","2 m³","3 m³","6 m³","7 m³","10 m³"];

const produtos: Produto[] = [
  {nome:"Recarga Sodastream",formula:"CO₂",categoria:"Exclusivo",imagem:"/images/produtos/co2.webp",tamanhos:["425 g (60 L)"],faixa:"425 g (60 L)",descricao:"Recarga do cilindro de CO₂ de 425 g, compatível com máquinas Sodastream."},
  {nome:"SOMIX",formula:"N₂ + CO₂",categoria:"Alimentício",imagem:"/images/produtos/somix.webp",tamanhos:["1 m³","2 m³","3 m³","6 m³","7 m³"],faixa:"1 a 7 m³",descricao:"Mistura de nitrogênio e CO₂ para aplicações em bebidas."},
  {nome:"Oxigênio Medicinal",formula:"O₂",categoria:"Medicinal",imagem:"/images/produtos/oxigenio-medicinal.webp",tamanhos:seis,faixa:"1 a 10 m³",descricao:"Oxigênio medicinal para hospitais, clínicas e home care."},
  {nome:"CO₂ Medicinal USP",formula:"CO₂ USP",categoria:"Medicinal",imagem:"/images/produtos/co2-usp.webp",tamanhos:["4,5 kg","7 kg","28 kg","33 kg"],faixa:"4,5 · 7 · 28 · 33 kg",descricao:"Grau farmacêutico USP para uso medicinal."},
  {nome:"Óxido Nitroso",formula:"N₂O",categoria:"Medicinal / alimentício",imagem:"/images/produtos/oxido-nitroso.webp",tamanhos:["4,5 kg","7 kg","28 kg","33 kg"],faixa:"4,5 · 7 · 28 · 33 kg",descricao:"Óxido nitroso para aplicações medicinais e alimentícias."},
  {nome:"Dióxido de Carbono",formula:"CO₂",categoria:"Industrial / alimentício",imagem:"/images/produtos/co2.webp",tamanhos:["1 kg","4,5 kg","6 kg","10 kg","25 kg","45 kg"],faixa:"1 a 45 kg",descricao:"CO₂ para bebidas, eventos e diferentes aplicações profissionais."},
  {nome:"Oxigênio Industrial",formula:"O₂",categoria:"Industrial",imagem:"/images/produtos/oxigenio-industrial.webp",tamanhos:seis,faixa:"1 a 10 m³",descricao:"Oxigênio industrial para diferentes processos e operações."},
  {nome:"Nitrogênio Industrial",formula:"N₂",categoria:"Industrial",imagem:"/images/produtos/nitrogenio-industrial.webp",tamanhos:seis,faixa:"1 a 10 m³",descricao:"Nitrogênio para inertização, resfriamento e processos industriais."},
  {nome:"Argônio Industrial",formula:"Ar",categoria:"Industrial",imagem:"/images/produtos/argonio.webp",tamanhos:seis,faixa:"1 a 10 m³",descricao:"Argônio para processos que exigem atmosfera inerte."},
  {nome:"Acetileno",formula:"C₂H₂",categoria:"Industrial",imagem:"/images/produtos/acetileno.webp",tamanhos:["1 kg","5 kg","9 kg"],faixa:"1 · 5 · 9 kg",descricao:"Acetileno para aplicações industriais."},
  {nome:"Ar Comprimido",formula:"Ar",categoria:"Industrial",imagem:"/images/produtos/ar-comprimido.webp",tamanhos:["2 m³","3 m³","6 m³","7 m³","10 m³"],faixa:"2 a 10 m³",descricao:"Ar comprimido para pneumática, instrumentação e processos industriais."},
  {nome:"Misturas Especiais",formula:"MIX",categoria:"Especial",imagem:"/images/produtos/misturas-especiais.webp",tamanhos:seis,faixa:"1 a 10 m³",descricao:"Composições sob medida para diferentes processos."},
  {nome:"Nitrogênio Analítico 5.0",formula:"N₂",categoria:"Analítico",imagem:"/images/produtos/nitrogenio-analitico.webp",tamanhos:seis,faixa:"1 a 10 m³",descricao:"Grau analítico 5.0 para laboratório e instrumentação de precisão."},
  {nome:"Hélio 5.0 Analítico",formula:"He",categoria:"Analítico",imagem:"/images/produtos/helio.webp",tamanhos:seis,faixa:"1 a 10 m³",descricao:"Hélio 5.0 para aplicações analíticas e profissionais."},
  {nome:"Argônio 5.0 Analítico",formula:"Ar",categoria:"Analítico",imagem:"/images/produtos/argonio-analitico.webp",tamanhos:seis,faixa:"1 a 10 m³",descricao:"Argônio 5.0 para laboratório e instrumentação."},
  {nome:"Acetileno Grau Absorção Atômica",formula:"AA",categoria:"Analítico",imagem:"/images/produtos/acetileno-aa.webp",tamanhos:["7,5 kg","9 kg"],faixa:"7,5 ou 9 kg",descricao:"Acetileno de alta pureza para espectrofotometria de absorção atômica."},
];

const filtros = ["Todos","Medicinal","Industrial","Alimentos e bebidas","Analítico","Especial"];
function grupo(c: string) {
  if (c.includes("Medicinal")) return "Medicinal";
  if (c.includes("Industrial")) return "Industrial";
  if (c.includes("limentício") || c === "Exclusivo") return "Alimentos e bebidas";
  return c;
}

/* Cor da faixa de cada cilindro (ogiva). Ajuste conforme as fotos. */
const cores: Record<string,string> = {
  "Recarga Sodastream":"#9aa3a8","SOMIX":"#d4a63a","Oxigênio Medicinal":"#1f9d4a","CO₂ Medicinal USP":"#9aa3a8",
  "Óxido Nitroso":"#1c2f6e","Dióxido de Carbono":"#f28a1b","Oxigênio Industrial":"#2f6fd6","Nitrogênio Industrial":"#222",
  "Argônio Industrial":"#7a4a2b","Acetileno":"#b3262d","Ar Comprimido":"#1f9d4a","Misturas Especiais":"#6b4fa0",
};
const corDe = (n: string) => cores[n] || "#4b6a62";
const ticker = ["Óxido Nitroso","Argônio","Ar Comprimido","Hélio 5.0 Analítico","Dióxido de Carbono","Oxigênio Medicinal","Oxigênio Industrial","Nitrogênio Industrial","Acetileno"];

/* MARCAS que confiam na Só CO₂. Quando tiver os logos, adicione logo: "/images/parceiros/arquivo.png". */
type Parceiro = { nome: string; logo?: string };
const parceiros: Parceiro[] = [
  { nome: "Potiguar" },
  { nome: "Izzi Nure Guardem" },
  { nome: "Madame Tulipa" },
  { nome: "Cruls Cervejaria" },
  { nome: "Quatro Poderes" },
];
const embaralha = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

const endereco = "Q. 800, Conjunto 5, Lote 05 — Recanto das Emas, Brasília/DF";
const WHATS = "5561996254506";

/* Logo: coloque o arquivo em /public/images/logo.png (ou ajuste LOGO). Se não existir, mostra o texto. */
const LOGO = "/images/logo.png";
function Logo() {
  const [ok, setOk] = useState(true);
  return <a className="logo" href="#inicio" aria-label="Só CO₂ — início">
    {ok ? <img src={LOGO} alt="Só CO₂ e gases especiais" onError={()=>setOk(false)}/> : <><span className="mark">◒</span><b>SÓ CO₂</b><small>e gases especiais</small></>}
  </a>;
}

export default function Home() {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [tamanho, setTamanho] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [ordem, setOrdem] = useState(parceiros);
  useEffect(()=>{ setOrdem(embaralha(parceiros)); },[]);
  const [form, setForm] = useState({nome:"",quantidade:"",local:"",aplicacao:""});

  const lista = useMemo(()=> filtro==="Todos" ? produtos : produtos.filter(p=>grupo(p.categoria)===filtro),[filtro]);

  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{ if(e.key==="Escape") setProduto(null); };
    window.addEventListener("keydown",onKey);
    return ()=>window.removeEventListener("keydown",onKey);
  },[]);

  function abrir(p: Produto){ setProduto(p); setTamanho(p.tamanhos.length===1 ? p.tamanhos[0] : ""); }
  function enviar(){
    if(!produto) return;
    const msg = [
      "Olá! Gostaria de solicitar um orçamento na Só CO₂.",
      `Produto: ${produto.nome}`,
      `Capacidade: ${tamanho || "a definir"}`,
      `Nome: ${form.nome || "-"}`,
      `Quantidade: ${form.quantidade || "-"}`,
      `Local de entrega: ${form.local || "-"}`,
      `Aplicação: ${form.aplicacao || "-"}`
    ].join("\n");
    window.open(`https://wa.me/${WHATS}?text=${encodeURIComponent(msg)}`,"_blank");
  }

  return <main>
    <header className="top">
      <div className="shell nav">
        <Logo/>
        <nav aria-label="Principal"><a href="#gases">Gases</a><a href="#setores">Setores</a><a href="#empresa">Empresa</a><a href="#localizacao">Contato</a></nav>
        <a className="pill orange" href="#gases">Pedir orçamento</a>
      </div>
    </header>

    <section id="inicio" className="hero">
      <div className="heroBg" aria-hidden="true"/>
      <div className="shell heroInner">
        <h1>Gás na hora certa,<br/>sem o seu negócio parar.</h1>
        <p>CO₂, oxigênio medicinal, óxido nitroso, CO₂ USP e outros gases entregues em toda Brasília, com frota própria e padrão Anvisa.</p>
        <div className="actions">
          <a className="pill orange" href={`https://wa.me/${WHATS}`} target="_blank" rel="noreferrer">Pedir orçamento</a>
          <a className="pill ghost" href="#gases">Ver catálogo</a>
        </div>
      </div>
      <div className="shell formulas" aria-hidden="true">
        {["O₂","CO₂","N₂","N₂O","Ar","He","C₂H₂"].map(f=><span key={f}>{f}</span>)}
      </div>
    </section>

    <div className="ticker" aria-hidden="true"><div className="tickTrack">{[...ticker,...ticker].map((t,i)=><span key={i}>{t}</span>)}</div></div>

    <section id="gases" className="catalog">
      <div className="shell">
        <div className="sectionHead">
          <h2>Catálogo de gases</h2>
          <p>{produtos.length} produtos. Escolha um para ver as capacidades e pedir orçamento.</p>
        </div>
        <div className="filters" role="tablist" aria-label="Filtrar por tipo">
          {filtros.map(f=><button key={f} role="tab" aria-selected={filtro===f} className={filtro===f?"chip on":"chip"} onClick={()=>setFiltro(f)}>{f}</button>)}
        </div>
        <ul className="list">
          {lista.map(p=><li key={p.nome}>
            <button className="row" onClick={()=>abrir(p)} style={{["--c" as string]:corDe(p.nome)}}>
              <span className="rowFormula">{p.formula}</span>
              <span className="rowMain"><strong>{p.nome}</strong><small>{p.categoria}</small></span>
              <span className="rowRange">{p.faixa}</span>
              <span className="rowPic"><img src={p.imagem} alt="" loading="lazy"/></span>
            </button>
          </li>)}
        </ul>
      </div>
    </section>

    <section id="setores" className="sectors">
      <div className="shell sectorsGrid">
        <div>
          <h2>Quem compra da gente</h2>
          <p>Se o seu setor não está aqui, fale com a equipe: temos todos os gases do mercado disponíveis para a sua aplicação.</p>
          <a className="pill orange" href={`https://wa.me/${WHATS}`} target="_blank" rel="noreferrer">Falar com a equipe</a>
        </div>
        <ul className="buyers">
          {["Hospitais e clínicas","Indústrias","Restaurantes e bares","Profissionais autônomos","Construção civil","Shows e eventos","Laboratórios","Home care"].map(t=><li key={t}><a href="#gases">{t}</a></li>)}
        </ul>
      </div>
    </section>

    {ordem.length>0 && <section className="partners" aria-label="Marcas parceiras">
      <div className="shell"><h2>Marcas que já confiam na Só CO₂</h2></div>
      <div className="marq"><div className="marqTrack">{[...ordem,...ordem,...ordem,...ordem].map((p,i)=><span className="partner" key={i}>{p.logo ? <img src={p.logo} alt={p.nome}/> : p.nome}</span>)}</div></div>
    </section>}

    <section id="empresa" className="company">
      <div className="companyPhoto"><img src="/images/estrutura-soco2.png" alt="Estrutura da Só CO₂"/></div>
      <div className="companyCopy">
        <h2>Estrutura própria para atender você</h2>
        <p>Frota própria, equipe especializada e uma operação preparada para diferentes demandas de gases em Brasília.</p>
        <ul className="facts"><li>Frota própria</li><li>Atendimento direto</li><li>Equipe especializada</li><li>Diversidade de gases</li></ul>
        <a className="pill orange" href="#localizacao">Ver localização</a>
      </div>
    </section>

    <section className="quick">
      <div className="shell quickInner">
        <div><h2>Não achou o gás que precisa?</h2><p>Escolha o produto e a capacidade e envie o pedido pelo WhatsApp.</p></div>
        <a className="pill dark" href="#gases">Escolher meu gás</a>
      </div>
    </section>

    <section id="localizacao" className="location">
      <div className="shell locationGrid">
        <div className="where">
          <h2>Visite a Só CO₂</h2>
          <p className="address">{endereco}</p>
          <dl className="hours"><dt>Segunda a sexta</dt><dd>7h às 18h</dd><dt>Sábado</dt><dd>8h às 16h</dd></dl>
          <div className="actions">
            <a className="pill orange" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`}>Traçar rota</a>
            <a className="pill whatsapp" target="_blank" rel="noreferrer" href={`https://wa.me/${WHATS}`}>WhatsApp</a>
          </div>
        </div>
        <div className="map">
          <iframe title="Mapa Só CO₂" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent("Q. 800, Conjunto 5, Lote 05, Recanto das Emas, Brasília DF")}&output=embed`}></iframe>
        </div>
      </div>
    </section>

    <footer>
      <div className="shell foot">
        <div><Logo/><p>Gases medicinais e industriais em Brasília.</p></div>
        <div><b>Navegação</b><a href="#gases">Gases</a><a href="#setores">Setores</a><a href="#empresa">Empresa</a></div>
        <div><b>Contato</b><a href="tel:+5561996254506">(61) 99625-4506</a><span>Recanto das Emas — Brasília/DF</span></div>
      </div>
    </footer>

    <a className="floatWa" href={`https://wa.me/${WHATS}`} target="_blank" rel="noreferrer" aria-label="Chamar no WhatsApp">WhatsApp</a>

    {produto && <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setProduto(null)}}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={produto.nome}>
        <button className="x" onClick={()=>setProduto(null)} aria-label="Fechar">×</button>
        <div className="modalGrid">
          <div className="modalImage"><img src={produto.imagem} alt={produto.nome}/></div>
          <div className="modalContent">
            <small className="cat">{produto.categoria}</small>
            <h3>{produto.nome}</h3><p>{produto.descricao}</p>
            <div className="capacityTitle"><b>Capacidade</b><small>{produto.faixa}</small></div>
            <div className="sizes">{produto.tamanhos.map(t=><button className={tamanho===t?"selected":""} onClick={()=>setTamanho(t)} key={t}>{t}</button>)}</div>
            {tamanho && <div className="quoteForm">
              <label>Nome<input value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} placeholder="Seu nome"/></label>
              <div className="two">
                <label>Quantidade<input value={form.quantidade} onChange={e=>setForm({...form,quantidade:e.target.value})} placeholder="Ex: 2 cilindros"/></label>
                <label>Entrega em<input value={form.local} onChange={e=>setForm({...form,local:e.target.value})} placeholder="Bairro e cidade"/></label>
              </div>
              <label>Uso<textarea value={form.aplicacao} onChange={e=>setForm({...form,aplicacao:e.target.value})} placeholder="Aplicação ou processo"/></label>
              <button className="send" onClick={enviar}>Enviar pedido pelo WhatsApp</button>
            </div>}
          </div>
        </div>
      </div>
    </div>}
  </main>
}
