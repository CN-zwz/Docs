import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '动态博客',
    Img: require('@site/static/img/WordPress-1.webp').default,
    description: (
      <>
        基于WordPress的动态博客，部署在国外的免费服务器上。
        <br />
        目前开放用户注册，可使用邮箱。但基本停止使用。
        <div className={styles.buttonContainer}>
          <a className={styles.button} href="https://zhongwz.top/wordpress" target="_blank" rel="noreferrer">点击访问</a>
        </div>
      </>
    ),
  },
  {
    title: '框架式动态博客',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        基于Docusaurus的框架式动态博客，使用Markdown等语法编写文章。
        源代码存储在<a href='https://github.com/CN-zwz/Docs'>Github的仓库</a>上。
        <br />
        <div className={styles.buttonContainer}>
          <a className={styles.button} href="https://docs.zhongwz.top" target="_blank" rel="noreferrer">点击访问</a>
        </div>
      </>
    ),
  },
];

function Feature({Img, Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Img ? (
          <img src={Img} alt={title} className={styles.featureSvg} /> // 如果有 Img，则使用 <img> 渲染
        ) : (
          <Svg className={styles.featureSvg} role="img" /> // 否则使用 Svg 渲染
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
