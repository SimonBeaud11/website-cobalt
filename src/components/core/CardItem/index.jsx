import { Link } from 'hyperstatic'
import { card } from '/src/styles/utils.css'

export const articleItem = (article) => (
  <Link className={card} href={`/articles/${article.slug}`} data-aos="fade-up">
    <span>
      <h3 className="cardTitle">{article.title}</h3>
      <x innerHTML={article.excerpt} />
      <div className="fade">
        <time dateTime={article.time}>{article.date}</time>
        <Link href={`/articles/${article.slug}`}>Lire l'article <span className="rightArr">↑</span></Link>
      </div>
    </span>
  </Link>
)

export const projectItem = (project) => (
  <Link className={card} href={`/projets/${project.slug}`} data-aos="fade-up">
    <span>
      <img src={project.featuredImage.mediaItemUrl} alt={project.featuredImage.altText} loading="lazy" />
      <h3 className="fade">{project.title}</h3>
    </span>
  </Link>
)