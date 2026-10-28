import Image from "next/image";

type Props = {
  /** "rodape" é a versão do Figma desenhada para o fundo cinza do rodapé. */
  variant?: "padrao" | "rodape";
  width: number;
  height: number;
  priority?: boolean;
};

// SVG exportado do Figma. next/image não otimiza SVG, então ele vai como está (e fica em cache uma vez só).
export function Logo({ variant = "padrao", width, height, priority = false }: Props) {
  return (
    <Image
      src={variant === "rodape" ? "/brand/logo-rodape.svg" : "/brand/logo.svg"}
      alt="Econverse"
      width={width}
      height={height}
      priority={priority}
      unoptimized
    />
  );
}
