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
        description="A digital goods trading platform."
        link="https://ultraverse-nft-world-mkt.vercel.app/"
      />
    ),
  },
  {
    project: (
      <ProjectCard
        preview={['/summarist01.png', '/summarist02.png', '/summarist03.png', '/summarist04.png']}
        title="Summarist"
        description="A full-stack ebook summary service."
        link="https://summarist-wm79.vercel.app/"
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
        description="Lightweight book library app with a clean and simple UI"
        link="https://libraryapp-ebon.vercel.app/"
      />
    )
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
        description="Frontend for AI powered skincare"
        link="https://skinstric-ai-rust.vercel.app/"
      />
    )
  },
  {
    project: (
      <ProjectCard
        preview={['/famedb01.png', '/famedb02.png', '/famedb03.png', '/famedb04.png']}
        title="FameDB"
        description="Mini project blending colors, icons, and simple effects to create a captivating UI. Tv/film db frontend."
        link="https://famedbvercel.vercel.app/"
      />
    )
  },
]