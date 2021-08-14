import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'
import { StyledFC } from '../types'
import styled from 'styled-components'
import Page from '../components/Page'
import { createPerson, fetchPerson } from '../http/personAPI'
import { LIMIT } from '../constants'
import { PersonType } from '../App'

const _NewPerson: StyledFC<{
  userId: number
  persons: { count: number; rows: PersonType[] }
  setPersons: Dispatch<SetStateAction<{ count: number; rows: PersonType[] }>>
}> = ({ className, userId, persons, setPersons }) => {
  const history = useHistory()

  const [inputsState, setInputsState] = useState<{
    name: string
    description: string
    imageFile: string | Blob
    rawFileName: string
    momId: number
    dadId: number
    userId: number
  }>({
    name: '',
    description: '',
    imageFile: '',
    rawFileName: '',
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
    imageFile: {
      type: 'file',
      placeholder: 'image',
      onChange: (e) => {
        setInputsState({
          ...inputsState,
          imageFile: e.target.files ? e.target.files[0] : '',
          rawFileName: e.target.files ? e.target.files[0].name : '',
        })
        console.log(e.target.files ? e.target.files[0].name : '')
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
    console.log({ formData })
    //createDevice(formData).then((data) => onHide())

    const { id } = await createPerson(formData)
    //console.log({ id })
    //await setPersons({ ...persons, rows: [] })
    const newPerson = await fetchPerson(id)
    setPersons({
      count: persons.count + 1,
      rows: [newPerson, ...persons.rows.slice(0, LIMIT - 1)],
    })
    history.goBack()
    //console.log({ result })
    //console.log({ persons })
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
