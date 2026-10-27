import './QuickExit.css'

function QuickExit() {
  const handleQuickExit = () => {
    window.location.replace('https://www.google.com')
  }

  return (
    <button className="quick-exit-btn" onClick={handleQuickExit}>
      ✕ Quick Exit
    </button>
  )
}

export default QuickExit