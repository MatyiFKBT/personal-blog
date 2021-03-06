import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

class TagPosts extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post => (
      <li className="my-2" key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
      </li>
    ))
    const tag = this.props.pathContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

    return (
      <section className="section">
        <Helmet title={`${tag} | ${title}`} />
        <h1 className="text-3xl my-6">{tagHeader}</h1>
        <ul>{postLinks}</ul>
        <p className="mt-8">
          <Link to="/tags/">Browse all tags</Link>
        </p>
      </section>
    )
  }
}

export default TagPosts

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
