import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const HomepageTemplate = ({ data: { about_us, what_we_do}}) => {

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h1>About Us</h1>
              <p>{about_us}</p>
              <h1>What We Do</h1>
              <p>{what_we_do.description}</p>
              <ul>
                {what_we_do.services.map(({ image, link, name }) => (
                  <li>
                    <a href={link}>
                      <img src={image.publicURL} />
                      <span>{name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

HomepageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  about_us: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const Homepage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  console.log('FFFF', frontmatter);
  return (
    <Layout>
      <HomepageTemplate
        data={frontmatter}
      />
    </Layout>
  )
}

Homepage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Homepage

export const homepageQuery = graphql`
  query Homepage($id: String!) {
    markdownRemark(id: { eq: $id }, fields: {slug: {regex: "/homepage/"}}) {
      id
      html
      fields {
        slug
      }
      excerpt
      frontmatter {
        title
        about_us
        what_we_do {
          description
          services {
            link
            name
            image {
              publicURL
            }
          }
        }
      }
    }
  }
`
