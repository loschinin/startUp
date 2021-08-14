import React, { ChangeEvent, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'
import { StyledFC } from '../types'
import styled from 'styled-components'
import Page from '../components/Page'
import { createPerson } from '../http/personAPI'

const _NewPerson: StyledFC<{ userId: number }> = ({ className, userId }) => {
  const history = useHistory()

  const [inputsState, setInputsState] = useState<{
    name: string
    description: string
    image: string | Blob
    momId: number
    dadId: number
    userId: number
  }>({
    name: '',
    description: '',
    image: '',
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
      placeholder: 'name',
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
    image: {
      type: 'file',
      placeholder: 'image',
      onChange: (e) =>
        setInputsState({
          ...inputsState,
          image: e.target.files ? e.target.files[0] : '',
        }),
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
    formData.append('image', inputsState.image)
    /** todo: find better solution */
    formData.append('momId', inputsState.momId as unknown as string)
    formData.append('dadId', inputsState.dadId as unknown as string)
    formData.append('userId', userId as unknown as string)
    console.log({ formData })
    //createDevice(formData).then((data) => onHide())

    const res = await createPerson(formData)
    await console.log(res)
  }
  return (
    <Page className={className}>
      <Button onClick={() => history.goBack()}>Go back</Button>
      <div>
        <hr />
      </div>
      {Object.keys(inputs).map((i) => (
        <Input
          key={i}
          type={inputs[i].type}
          placeholder={inputs[i].placeholder}
          value={inputs[i].value}
          onChange={inputs[i].onChange}
        />
      ))}
      <Button onClick={() => saveNewPerson()}>Save new person</Button>
    </Page>
  )
}

const NewPerson = styled(_NewPerson)``

export default NewPerson
