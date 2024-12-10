import React from 'react'

export const Footer = () => {
  return (
    <footer className="text-center pb-8 pt-24 text-sm text-[#212529]">
      © {new Date().getFullYear()} <span className="font-pacifico">PhotoSearch.</span> ❤️ Wilson
      Adenuga
    </footer>
  )
}
