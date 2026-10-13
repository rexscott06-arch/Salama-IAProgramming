import { motion } from 'framer-motion'
import './ProjectFiles.css'

const fileGroups = [
  {
    folder: 'components',
    files: ['Hero.jsx', 'Navbar.jsx', 'QuickExit.jsx', 'SectionCards.jsx'],
  },
  {
    folder: 'pages',
    files: ['Home.jsx', 'AwarenessPage.jsx', 'ReportPage.jsx', 'ResourcesPage.jsx'],
  },
  {
    folder: 'root',
    files: ['App.jsx', 'App.css', 'index.css'],
  },
]

function ProjectFiles() {
  return (
    <section className="project-files" aria-labelledby="project-files-title">
      <div className="project-files-heading">
        <div>
          <p className="project-files-kicker">Workspace</p>
          <h2 id="project-files-title">Files in progress</h2>
          <p className="project-files-subtitle">A quick view of the Salama project structure.</p>
        </div>
        <span className="project-files-status">● Live workspace</span>
      </div>

      <motion.div
        className="file-tree"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        viewport={{ once: true }}
      >
        <div className="file-tree-toolbar">
          <span>salama-gbv</span>
          <span className="file-count">11 visible files</span>
        </div>
        <div className="file-tree-content">
          {fileGroups.map((group) => (
            <div className="file-group" key={group.folder}>
              <div className="folder-row"><span className="tree-chevron">⌄</span><span className="folder-icon">▾</span>{group.folder}</div>
              {group.files.map((file) => (
                <div className={`file-row ${file === 'Home.jsx' ? 'file-row-active' : ''}`} key={file}>
                  <span className="file-branch">└</span>
                  <span className="file-icon">{file.endsWith('.css') ? '◈' : '◇'}</span>
                  <span>{file}</span>
                  {file === 'Home.jsx' && <span className="active-label">editing</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default ProjectFiles
