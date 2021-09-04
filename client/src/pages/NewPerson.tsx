import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { PersonType } from '../App'
import Button from '../components/Button'
import Input from '../components/Input'
import Page from '../components/Page'
import TextArea from '../components/TextArea'
import { BASE_URL, DESCRIPTION_LIMIT, PAGES_LIMIT } from '../constants'
import { colors } from '../design'
import { createPerson, fetchPerson } from '../http/personAPI'
import { StyledFC } from '../types'
import { readFileAndSetBase64 } from '../utils'
import { InputsObj, InputsStateType } from './EditPerson'

const _NewPerson: StyledFC<{
  userId: number
  persons: { count: number; rows: PersonType[] }
  setPersons: Dispatch<SetStateAction<{ count: number; rows: PersonType[] }>>
  setWarnings: Dispatch<SetStateAction<string>>
}> = ({ className, userId, persons, setPersons, setWarnings }) => {
  const history = useHistory()
  const [imageBuffer, setImageBuffer] = useState<string | ArrayBuffer>(
    `${BASE_URL}defaultUser.svg`
  )
  const [inputsState, setInputsState] = useState<InputsStateType>({
    name: '',
    description: '',
    imageFile: '',
    userId,
  })

  const inputs: InputsObj = {
    imageFile: {
      type: 'file',
      placeholder: 'image',
      onChange: (e) => {
        /** IF IMG SELECTED */
        readFileAndSetBase64(e.target.files, setImageBuffer)
        if (e.target.files) {
          setInputsState({
            ...inputsState,
            imageFile: e.target.files[0],
          })
        } else {
          setInputsState({
            ...inputsState,
            imageFile: '',
          })
          setImageBuffer(`${BASE_URL}defaultUser.svg`)
        }
      },
    },
    name: {
      type: 'text',
      placeholder: 'name*',
      value: inputsState.name,
      onChange: (e) => setInputsState({ ...inputsState, name: e.target.value }),
    },
    description: {
      type: 'text',
      placeholder: `Please write description about the person shortly. Limit: ${DESCRIPTION_LIMIT}`,
      value: inputsState.description,
      onChange: (e) =>
        setInputsState({ ...inputsState, description: e.target.value }),
    },
  }
  //console.log(inputsState)

  const saveNewPerson = async () => {
    const formData = new FormData()
    formData.append('name', inputsState.name)
    formData.append('description', inputsState.description)
    formData.append('image', inputsState.imageFile)
    formData.append('userId', userId.toString())
    //console.log({ formData })
    //createDevice(formData).then((data) => onHide())
    try {
      const { id } = await createPerson(formData)
      const newPerson = await fetchPerson(id)
      setPersons({
        count: persons.count + 1,
        rows: [newPerson, ...persons.rows.slice(0, PAGES_LIMIT - 1)],
      })
      history.goBack()
      setWarnings('')
    } catch (e) {
      //console.log(e.message)
      setWarnings(e.message)
    }
  }

  return (
    <Page className={className}>
      <Button onClick={() => history.goBack()}>Go back</Button>
      <div>
        <hr />
      </div>
      {(imageBuffer || '') && (
        <div
          className={'image'}
          style={{
            backgroundImage: `url(${imageBuffer})`,
          }}
        />
      )}
      {Object.keys(inputs).map((i, index) =>
        index !== 2 ? (
          <Input
            key={i}
            type={inputs[i].type}
            placeholder={inputs[i].placeholder}
            value={inputs[i].value}
            onChange={inputs[i].onChange}
          />
        ) : (
          <div key={i}>
            <div>
              Description:{' '}
              <span
                style={{
                  color: `${
                    inputsState.description.length > DESCRIPTION_LIMIT
                      ? colors.warningTextColor
                      : colors.primaryTextColor
                  }`,
                }}
              >
                {inputsState.description.length}
              </span>
            </div>
            <TextArea
              rows={7}
              placeholder={inputs[i].placeholder}
              value={inputs[i].value}
              onChange={
                inputs[i].onChange as unknown as (
                  e: ChangeEvent<HTMLTextAreaElement>
                ) => void
              }
            />
          </div>
        )
      )}
      <Button
        disabled={
          !(
            inputsState.name &&
            inputsState.imageFile &&
            inputsState.description.length < DESCRIPTION_LIMIT
          )
        }
        primary
        onClick={() => saveNewPerson()}
      >
        Save new person
      </Button>
    </Page>
  )
}

const NewPerson = styled(_NewPerson)`
  .image {
    overflow: hidden;
    border-radius: 0;
    width: 100%;
    max-width: 400px;
    height: 300px;
    background-size: cover;
    background-position: 50% 30%;
  }
`

export default NewPerson
