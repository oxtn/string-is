import { Alert, majorScale, TextInput } from 'evergreen-ui'
import useTranslation from 'next-translate/useTranslation'
import { ChangeEvent, forwardRef, Fragment, useMemo, useState } from 'react'

import { CodeTextarea, Label } from '@components/forms'
import { OutputProps } from '@lib/types'

export const RegexOutput = forwardRef<HTMLTextAreaElement, OutputProps>(
  ({ disabled, input, ...props }: OutputProps, ref) => {
    const { t } = useTranslation('domain-convert-outputs-regexOutput')

    const [testString, setTestString] = useState('')

    const onChangeTestString = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setTestString(event.target.value)
    }

    const matches = useMemo((): Array<Array<string>> | undefined => {
      try {
        const [_, regexStr, modifiers] =
          input.match(/^\/(.*)\/([igm]+)?$/) || []
        const regex = new RegExp(regexStr.replace(/\n/, ''), modifiers)
        // The matchAll() method throws an error if the 'g' modifier has not been provided.
        if (modifiers?.includes('g')) {
          return [...testString.matchAll(regex)]
        } else {
          const result = testString.match(regex)
          if (result && result.length > 0) {
            return [result]
          } else {
            return []
          }
        }
      } catch (err) {
        return undefined
      }
    }, [input, testString])

    const hasTestString = testString.trim().length > 0

    return (
      <>
        <CodeTextarea
          {...props}
          disabled={disabled}
          id="testStringInput"
          isInvalid={!disabled && !hasTestString}
          marginBottom={disabled ? 0 : majorScale(1)}
          onChange={onChangeTestString}
          placeholder={disabled ? '' : t('test_string_placeholder')}
          readOnly={false}
          ref={ref}
          value={disabled ? '' : testString}
        />

        {!disabled && !hasTestString && matches && (
          <Alert intent="info" title={t('alert_no_input')} />
        )}

        {!disabled && !matches && (
          <Alert intent="danger" title={t('alert_invalid_input')} />
        )}

        {hasTestString && matches?.length === 0 && (
          <Alert intent="warning" title={t('alert_no_matches')} />
        )}

        {matches && matches.length > 0 && (
          <>
            {matches.map((match, matchIndex) => {
              const [whole, ...groups] = match
              const matchKey = `regexMatch-${matchIndex}`

              return (
                <Fragment key={matchKey}>
                  <Alert
                    intent="success"
                    marginBottom={majorScale(1)}
                    title={
                      matches.length === 1
                        ? t('alert_single_match', { count: groups.length })
                        : t('alert_multiple_matches', {
                            count: groups.length,
                            number: matchIndex + 1,
                          })
                    }
                  />

                  {
                    <Label
                      htmlFor={matchKey}
                      key={matchKey}
                      label={t('match_label', {
                        count: matches.length,
                        number: matchIndex + 1,
                      })}
                    >
                      <TextInput
                        id={matchKey}
                        readOnly={true}
                        value={whole}
                        width="100%"
                      />
                    </Label>
                  }

                  {groups.map((group, groupIndex) => {
                    const groupKey = `regexMatch-${matchIndex}-${groupIndex}`
                    return (
                      <Label
                        htmlFor={groupKey}
                        key={groupKey}
                        label={t('group_label', { number: groupIndex + 1 })}
                      >
                        <TextInput
                          id={groupKey}
                          readOnly={true}
                          value={group}
                          width="100%"
                        />
                      </Label>
                    )
                  })}
                </Fragment>
              )
            })}
          </>
        )}
      </>
    )
  },
)