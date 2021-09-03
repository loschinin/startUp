import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { PersonType } from '../App'
import Button from '../components/Button'
import Input from '../components/Input'
import Page from '../components/Page'
import TextArea from '../components/TextArea'
import {
  BASE_URL,
  DESCRIPTION_LIMIT,
  FIRST_PAGE,
  PAGES_LIMIT,
} from '../constants'
import { colors } from '../design'
import {
  deletePerson,
  fetchAllPersons,
  fetchPerson,
  updatePerson,
} from '../http/personAPI'
import { StyledFC } from '../types'
import { readFileAndSetBase64 } from '../utils'

export type InputsStateType = {
  name: string
  description: string
  image?: string
  imageFile: string | Blob
  momId: number
  dadId: number
  userId: number
}

export type InputsObj = {
  [k: string]: {
    type: string
    placeholder: string
    value?: string | number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  }
}

const _EditPerson: StyledFC<{
  userId: number
  persons: { count: number; rows: PersonType[] }
  setPersons: Dispatch<SetStateAction<{ count: number; rows: PersonType[] }>>
  setWarnings: Dispatch<SetStateAction<string>>
}> = ({ className, userId, persons, setPersons, setWarnings }) => {
  const { id } = useParams<{ id: string }>()
  //console.log({ id })
  const [initialInputsState, setInitialInputsState] = useState<InputsStateType>(
    {
      name: '',
      description: '',
      image: '',
      imageFile: '',
      momId: 0,
      dadId: 0,
      userId,
    }
  )
  const [inputsState, setInputsState] =
    useState<InputsStateType>(initialInputsState)
  //console.log('initialInputState', initialInputsState)
  //console.log('inputsState', inputsState)
  useMemo(() => {
    setInputsState(initialInputsState)
  }, [initialInputsState])
  //const [isAnyInputChanged, setIsAnyInputChanged] = useState(false)

  useEffect(() => {
    fetchPerson(+id).then(({ name, description, image, momId, dadId }) => {
      setInitialInputsState({
        name,
        description,
        image,
        imageFile: '',
        momId,
        dadId,
        userId,
      })
      //if (name !== inputsState.name) setIsAnyInputChanged(true)
      //console.log(name)
    })
  }, [id, userId])
  const history = useHistory()
  const [imageBuffer, setImageBuffer] = useState<string | ArrayBuffer>('')

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
          setImageBuffer('')
        }
      },
    },
    name: {
      type: 'text',
      placeholder: 'name*',
      value: inputsState.name,
      onChange: (e) => {
        setInputsState({ ...inputsState, name: e.target.value })
      },
    },
    description: {
      type: 'text',
      placeholder: `Please write description about the person shortly. Limit: ${DESCRIPTION_LIMIT}`,
      value: inputsState.description,
      onChange: (e) =>
        setInputsState({ ...inputsState, description: e.target.value }),
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
  const savePerson = async () => {
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
      const { name, description, image, momId, dadId, createdAt } =
        await updatePerson(formData, +id)
      //console.log({ res })
      console.log({ persons })
      const returnedUpdatedPerson = {
        id: +id,
        name,
        description,
        image,
        momId: +momId,
        dadId: +dadId,
        userId,
        createdAt,
        updatedAt: new Date().toISOString(),
      }
      console.log(+momId)
      setPersons({
        ...persons,
        rows: [
          ...persons.rows.map((p) => {
            if (p.id === returnedUpdatedPerson.id) {
              return returnedUpdatedPerson
            }
            return p
          }),
        ],
      })
      history.goBack()
      setWarnings('')
    } catch (e) {
      //console.log(e.message)
      setWarnings(e.message)
    }
  }

  const deletePersonHandler = async (personId: number) => {
    try {
      await deletePerson(personId, userId)
      await fetchAllPersons(PAGES_LIMIT, FIRST_PAGE).then((res) =>
        setPersons(res)
      )
      history.goBack()
    } catch (e) {
      setWarnings(e.message)
    }
  }
  return (
    <Page className={className}>
      <Button onClick={() => history.goBack()}>Go back</Button>
      <div>
        <hr />
      </div>
      <div>Person ID: {id}</div>
      {(imageBuffer || inputsState.image) && (
        <div
          className={'image'}
          style={{
            backgroundImage: `url(${
              imageBuffer || BASE_URL + inputsState.image
            })`,
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
          JSON.stringify(initialInputsState) === JSON.stringify(inputsState) ||
          !inputsState.name ||
          inputsState.description.length > DESCRIPTION_LIMIT
        }
        primary
        onClick={() => savePerson()}
      >
        Save changes
      </Button>
      <Button
        danger
        className={'del'}
        //disabled={p.id === deletedId}
        onClick={() => deletePersonHandler(+id)}
      >
        Remove all data about the person from database
      </Button>
    </Page>
  )
}

const EditPerson = styled(_EditPerson)`
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

export default EditPerson
