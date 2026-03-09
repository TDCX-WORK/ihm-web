# IHM Web — Mobile Fixes

3 archivos corregidos. Reemplaza en tu proyecto:

## 1. index.html  →  raíz del proyecto
**Bug:** `maximum-scale=1.0, user-scalable=no` + `gesturestart` listeners bloqueaban el zoom del usuario en Android.
**Fix:** Viewport limpio solo con `width=device-width, initial-scale=1.0`.

## 2. src/globals.css  →  src/globals.css
**Bug:** `button { cursor: none }` no tenía excepción para móvil. En touch devices los botones no mostraban cursor.
**Fix:** El bloque `@media (pointer: coarse)` ahora incluye también `button { cursor: auto }`.

## 3. src/components/Cursor.jsx  →  src/components/Cursor.jsx
**Bug:** El componente se montaba en todos los dispositivos, incluyendo móvil, añadiendo listeners de mousemove innecesarios.
**Fix:** Añadido `if (window.matchMedia('(pointer: coarse)').matches) return` dentro del useEffect — el cursor personalizado no se activa en touch devices.

---

## Cómo aplicar
```
Copiar index.html           →  ihm-web/index.html
Copiar src/globals.css      →  ihm-web/src/globals.css
Copiar src/components/Cursor.jsx  →  ihm-web/src/components/Cursor.jsx
```
Luego: `git add . && git commit -m "fix: mobile cursor and viewport" && git push`
