import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

// Ícones de interface desenhados com os mesmos traços do Figma (setas, fechar, mais/menos).
// Os ícones de topo e rodapé vêm prontos do Figma em figma-icons.tsx.
function Icon({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

// Seta do carrossel: o mesmo caminho do vetor do Figma (7 x 13 dentro do círculo de 32).
export const ChevronRightIcon = (p: IconProps) => (
  <Icon {...p} stroke="none" fill="currentColor">
    <path d="M9.4 18.3 10.75 19.6 18.35 12 10.75 4.4 9.4 5.7 15.6 12z" />
  </Icon>
);

export const ChevronLeftIcon = (p: IconProps) => <ChevronRightIcon {...p} style={{ transform: "scaleX(-1)" }} />;

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 5l14 14M19 5 5 19" />
  </Icon>
);

export const MinusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 12h12" />
  </Icon>
);

export const PlusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 6v12M6 12h12" />
  </Icon>
);
