# Firefox kaip numatytoji naršyklė

Šiame projekte UI peržiūrai ir testavimui naudokite Firefox naršyklę.

## Automatinis atidarymas

Paleidus dev serverį su:

    npm run dev

atidarote Firefox naršyklę su:

    npm run open-firefox

Tai automatiškai atidarys http://localhost:3000 Firefox naršyklėje (Windows aplinkoje).

## Kodėl Firefox?
- Visi OSS UI įrankiai (Next.js, React, shadcn/ui, Radix, Zustand, React Query, Tailwind) pilnai palaiko Firefox.
- Vengiama Chrome --no-sandbox ir /auth redirect problemų.

## Pastaba
Jei norite, kad naršyklė atsidarytų automatiškai, galite pridėti šį žingsnį į savo darbo eigą ar devcontainer konfigūraciją.
