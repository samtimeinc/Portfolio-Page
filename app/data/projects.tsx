import ProjectCard from '@/app/components/ProjectCard'

export const FEATURED_PROJECTS = [
  {
    project: (
      <ProjectCard
        preview={[
          '/ultraverse01.png',
          '/ultraverse02.png',
          '/ultraverse03.png',
          '/ultraverse04.png',
        ]}
        title="Ultraverse NFT World"
        description="A digital marketplace and goods trading platform."
        liveDemo="https://ultraverse-nft-world-mkt.vercel.app/"
        github="https://github.com/samtimeinc/Ultraverse-NFT-World-Marketplace"
      />
    ),
  },
  {
    project: (
      <ProjectCard
        preview={['/summarist01.png', '/summarist02.png', '/summarist03.png', '/summarist04.png']}
        title="Summarist"
        description="A full-stack ebook summary service with Stripe Integration"
        liveDemo="https://summarist-wm79.vercel.app/"
        github="https://github.com/samtimeinc/summarist"
      />
    ),
  },
]

export const HIDDEN_PROJECTS = [
  {
    project: (
      <ProjectCard
        preview={[
          '/library01.png',
          '/library02.png',
          '/library03.png',
          '/library04.png',
          '/library05.png',
          '/library06.png',
        ]}
        title="Library.app"
        description="Lightweight e-commerce app for books with a clean and simple UI"
        liveDemo="https://libraryapp-ebon.vercel.app/"
        github="https://github.com/samtimeinc/library.app"
      />
    ),
  },
  {
    project: (
      <ProjectCard
        preview={[
          '/skinstric01.png',
          '/skinstric02.png',
          '/skinstric03.png',
          '/skinstric04.png',
          '/skinstric05.png',
          '/skinstric06.png',
          '/skinstric07.png',
        ]}
        title="Skinstric"
        description="Frontend for AI powered skincare with user dashboard"
        liveDemo="https://skinstric-ai-rust.vercel.app/"
        github="https://github.com/samtimeinc/skinstric.ai"
      />
    ),
  },
  {
    project: (
      <ProjectCard
        preview={['/famedb01.png', '/famedb02.png', '/famedb03.png', '/famedb04.png']}
        title="FameDB"
        description="Tv/film db frontend blending colors, icons, and simple effects to create a captivating UI"
        liveDemo="https://famedbvercel.vercel.app/"
        github="https://github.com/samtimeinc/famedb_vercel"
      />
    ),
  },
]