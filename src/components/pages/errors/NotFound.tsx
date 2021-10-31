import { Heading, majorScale, Pane, Paragraph } from 'evergreen-ui'
import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'

import { Card } from '@components/layout/Card'
import { Link } from '@components/navigation'
import { ROUTE_CONVERT } from '@services/Routes'

export const NotFound = () => {
  const { t } = useTranslation('pages-errors-notFound')

  return (
    <Pane display="flex">
      <Head>
        <title>{t('page_title')}</title>
      </Head>

      <Card title={t('page_heading')}>
        <Heading size={400}>{t('our_site_heading')}</Heading>
        <Paragraph>{t('our_site_paragraph')}</Paragraph>

        <Heading marginTop={majorScale(2)} size={400}>
          {t('another_site_heading')}
        </Heading>
        <Paragraph>{t('another_site_paragraph')}</Paragraph>

        <Heading marginTop={majorScale(2)} size={400}>
          {t('typo_heading')}
        </Heading>
        <Paragraph>{t('typo_paragraph')}</Paragraph>

        <Paragraph marginTop={majorScale(2)}>
          <Trans
            components={{
              link: <Link href={`mailto:${process.env.CONTACT_EMAIL}`} />,
            }}
            i18nKey="pages-errors-notFound:contact_support"
          />
        </Paragraph>

        <Paragraph marginTop={majorScale(2)} textAlign="center">
          <Link href={ROUTE_CONVERT}>{t('home_button')}</Link>
        </Paragraph>
      </Card>
    </Pane>
  )
}