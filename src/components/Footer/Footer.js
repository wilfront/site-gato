import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p>Me siga nas redes:</p>
      <a 
        href="https://github.com/wilfront" 
        target="_blank" 
        rel="noopener noreferrer"
        className="footer-link"
      >
        GitHub
      </a>
      |
      <a 
        href="https://www.instagram.com/?next=%2F" 
        target="_blank" 
        rel="noopener noreferrer"
        className="footer-link"
      >
        Instagram
        -- @wilfront
      </a>
      <p>2025</p>
    </footer>
  )
}
