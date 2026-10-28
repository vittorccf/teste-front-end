import { Logo } from "@/components/brand/Logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/figma-icons";
import styles from "./Footer.module.scss";

const COLUMNS = [
  { title: "Institucional", links: ["Sobre Nós", "Movimento", "Trabalhe conosco"] },
  { title: "Ajuda", links: ["Suporte", "Fale Conosco", "Perguntas Frequentes"] },
  { title: "Termos", links: ["Termos e Condições", "Política de Privacidade", "Troca e Devolução"] },
];

const SOCIAL = [
  { label: "Instagram", icon: InstagramIcon },
  { label: "Facebook", icon: FacebookIcon },
  { label: "LinkedIn", icon: LinkedinIcon },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.newsletter} aria-labelledby="newsletter-title">
        <div className={styles.newsletterInner}>
          <div className={styles.newsletterIntro}>
            <h2 id="newsletter-title" className={styles.newsletterTitle}>
              Inscreva-se na nossa newsletter
            </h2>
            <p className={styles.newsletterText}>
              Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
            </p>
          </div>

          <form className={styles.newsletterForm} action="#" method="post">
            <div className={styles.fields}>
              <label htmlFor="newsletter-nome" className="visually-hidden">
                Nome
              </label>
              <input id="newsletter-nome" name="nome" placeholder="Digite seu nome" autoComplete="name" required />
              <label htmlFor="newsletter-email" className="visually-hidden">
                E-mail
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                autoComplete="email"
                required
              />
              <button type="submit">Inscrever</button>
            </div>
            <label className={styles.terms}>
              <input type="checkbox" name="termos" required />
              Aceito os termos e condições
            </label>
          </form>
        </div>
      </section>

      <div className={styles.main}>
        <div className={styles.mainInner}>
          <div className={styles.about}>
            <Logo variant="rodape" width={164} height={48} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <ul className={styles.social} aria-label="Redes sociais">
              {SOCIAL.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <a href="#" aria-label={label}>
                    <Icon size={24} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.columns}>
            {COLUMNS.map((column) => (
              <nav key={column.title} className={styles.column} aria-labelledby={`rodape-${column.title}`}>
                <h2 id={`rodape-${column.title}`} className={styles.columnTitle}>
                  {column.title}
                </h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.copyright}>
        <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
      </p>
    </footer>
  );
}
