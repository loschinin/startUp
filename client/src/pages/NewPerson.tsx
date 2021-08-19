import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'
import { StyledFC } from '../types'
import styled from 'styled-components'
import Page from '../components/Page'
import { createPerson, fetchPerson } from '../http/personAPI'
import { BASE_URL, LIMIT } from '../constants'
import { PersonType } from '../App'
import TextArea from '../components/TextArea'

const _NewPerson: StyledFC<{
  userId: number
  persons: { count: number; rows: PersonType[] }
  setPersons: Dispatch<SetStateAction<{ count: number; rows: PersonType[] }>>
  setWarnings: Dispatch<SetStateAction<string>>
}> = ({ className, userId, persons, setPersons, setWarnings }) => {
  const history = useHistory()
  const [imageBuffer, setImageBuffer] = useState<string | ArrayBuffer>('')
  const [inputsState, setInputsState] = useState<{
    name: string
    description: string
    imageFile: string | Blob
    momId: number
    dadId: number
    userId: number
  }>({
    name: 'Some name',
    description: '',
    imageFile: '',
    momId: 0,
    dadId: 0,
    userId,
  })

  const inputs: {
    [k: string]: {
      type: string
      placeholder: string
      value?: string | number
      onChange: (e: ChangeEvent<HTMLInputElement>) => void
    }
  } = {
    name: {
      type: 'text',
      placeholder: 'name*',
      value: inputsState.name,
      onChange: (e) => setInputsState({ ...inputsState, name: e.target.value }),
    },
    description: {
      type: 'text',
      placeholder: 'description',
      value: inputsState.description,
      onChange: (e) =>
        setInputsState({ ...inputsState, description: e.target.value }),
    },
    imageFile: {
      type: 'file',
      placeholder: 'image',
      onChange: (e) => {
        /** IF IMG SELECTED */
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader()
          reader.onloadend = function () {
            const result = reader.result
            if (result) setImageBuffer(result)
          }
          reader.readAsDataURL(e.target.files[0])
          setInputsState({
            ...inputsState,
            imageFile: e.target.files[0],
          })
        } else {
          setInputsState({
            ...inputsState,
            imageFile: '',
          })
          setImageBuffer('')
        }
        /*setInputsState({
          ...inputsState,
          imageFile: e.target.files ? e.target.files[0] : '',
        })*/
      },
    },
    momId: {
      type: 'number',
      placeholder: 'momId',
      value: inputsState.momId,
      onChange: (e) =>
        setInputsState({ ...inputsState, momId: +e.target.value }),
    },
    dadId: {
      type: 'number',
      placeholder: 'dadId',
      value: inputsState.dadId,
      onChange: (e) =>
        setInputsState({ ...inputsState, dadId: +e.target.value }),
    },
  }
  //console.log(inputsState)

  const saveNewPerson = async () => {
    const formData = new FormData()
    formData.append('name', inputsState.name)
    formData.append('description', inputsState.description)
    formData.append('image', inputsState.imageFile)
    formData.append('momId', inputsState.momId.toString())
    formData.append('dadId', inputsState.dadId.toString())
    formData.append('userId', userId.toString())
    //console.log({ formData })
    //createDevice(formData).then((data) => onHide())
    try {
      const { id } = await createPerson(formData)
      const newPerson = await fetchPerson(id)
      setPersons({
        count: persons.count + 1,
        rows: [newPerson, ...persons.rows.slice(0, LIMIT - 1)],
      })
      history.goBack()
      setWarnings('')
    } catch (e) {
      //console.log(e.message)
      setWarnings(e.message)
    }

    //console.log({ result })
    //console.log({ persons })
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
        >
          {/*<img src={`${imageBuffer}`} alt={''} />*/}
        </div>
      )}
      {Object.keys(inputs).map((i, index) =>
        index !== 1 ? (
          <Input
            key={i}
            type={inputs[i].type}
            placeholder={inputs[i].placeholder}
            value={inputs[i].value}
            onChange={inputs[i].onChange}
          />
        ) : (
          <TextArea
            rows={7}
            key={i}
            placeholder={inputs[i].placeholder}
            value={inputs[i].value}
            onChange={
              inputs[i].onChange as unknown as (
                e: ChangeEvent<HTMLTextAreaElement>
              ) => void
            }
          />
        )
      )}
      <Button
        disabled={!(inputsState.name && inputsState.imageFile)}
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
    //grid-area: image;
    overflow: hidden;
    border-radius: 0;
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center;

    img {
      width: 100%;
    }
    /*.del {
      grid-area: del;
    }*/
  }
`

export default NewPerson
