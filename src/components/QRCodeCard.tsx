import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download, Printer } from "lucide-react";

type Props = {
  value: string;
  label: string;
  sublabel?: string;
  filename?: string;
  size?: number;
};

export function QRCodeCard({ value, label, sublabel, filename = "QR-TOGOLIVING.png", size = 300 }: Props) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(value, {
      width: size * 1.4,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: "#1E3A5F", light: "#F8F5F0" },
    }).then(setDataUrl).catch(() => setDataUrl(""));
  }, [value, size]);

  const download = async () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  const printQR = () => {
    const w = window.open("", "_blank", "width=600,height=800");
    if (!w) return;
    w.document.write(`<!doctype html><html><head><title>${label}</title>
      <style>
        @page { margin: 1cm; }
        body { font-family: Georgia, serif; text-align: center; padding: 30px; color: #1E3A5F; }
        .brand { font-size: 26px; font-weight: 700; }
        .brand .turq { color: #40E0D0; }
        .label { font-size: 28px; margin: 18px 0 8px; }
        .frame { display: inline-block; padding: 14px; border: 3px solid #D4AF37; border-radius: 12px; background: #F8F5F0; }
        .sub { font-size: 14px; margin-top: 14px; color: #4A6480; font-style: italic; }
        .footer { margin-top: 24px; font-size: 12px; color: #4A6480; }
      </style>
    </head><body>
      <div class="brand">TOGO<span class="turq">LIVING</span></div>
      <div class="label">${label}</div>
      <div class="frame"><img src="${dataUrl}" width="320" height="320" /></div>
      <div class="sub">${sublabel ?? "Scannez avec votre telephone"}</div>
      <div class="footer">residencetogoliving.com &nbsp;|&nbsp; +228 93 87 20 88</div>
      <script>window.onload = () => { setTimeout(() => window.print(), 200); };</script>
    </body></html>`);
    w.document.close();
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gold/40 p-5 flex flex-col items-center text-center hover-lift">
      <div className="font-display text-ocean font-semibold">{label}</div>
      {sublabel && <div className="text-xs text-muted-foreground mb-3">{sublabel}</div>}
      <div className="my-3 p-3 rounded-xl bg-sand border border-gold/30">
        {dataUrl ? (
          <img src={dataUrl} alt={`QR ${label}`} width={size * 0.7} height={size * 0.7} />
        ) : (
          <div className="w-[210px] h-[210px] bg-muted animate-pulse rounded-md" />
        )}
      </div>
      <div className="flex gap-2 mt-2 w-full">
        <button onClick={download} className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-ocean text-white text-xs hover:bg-ocean/90">
          <Download size={14} /> PNG
        </button>
        <button onClick={printQR} className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-turquoise text-ocean text-xs hover:bg-gold">
          <Printer size={14} /> Imprimer
        </button>
      </div>
    </div>
  );
}
