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
      userId,
    }
  )
  const [inputsState, setInputsState] =
    useState<InputsStateType>(initialInputsState)
  useMemo(() => {
    setInputsState(initialInputsState)
  }, [initialInputsState])

  const history = useHistory()
  useEffect(() => {
    console.log(+id)
    if (isNaN(+id)) history.push('/')
    fetchPerson(+id)
      .then(({ name, description, image }) => {
        setInitialInputsState({
          name,
          description,
          image,
          imageFile: '',
          userId,
        })
      })
      .catch(() => history.push('/'))
  }, [id, userId, history])

  const [imageBuffer, setImageBuffer] = useState<string | ArrayBuffer>('')

  const selectImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    /** IF IMG SELECTED */
    readFileAndSetBase64(e.target.files, setImageBuffer)
    //console.log('imageBuffer:', imageBuffer)
    if (e.target.files && e.target.files[0]) {
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
  }

  const savePerson = async () => {
    const formData = new FormData()
    formData.append('name', inputsState.name)
    formData.append('description', inputsState.description)
    formData.append('image', inputsState.imageFile)
    formData.append('userId', userId.toString())
    //console.log({ formData })
    //createDevice(formData).then((data) => onHide())
    try {
      const { name, description, image, createdAt } = await updatePerson(
        formData,
        +id
      )
      //console.log({ res })
      //console.log({ persons })
      const returnedUpdatedPerson = {
        id: +id,
        name,
        description,
        image,
        userId,
        createdAt,
        updatedAt: new Date().toISOString(),
      }
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
      <Input
        type={'text'}
        placeholder={'name'}
        value={inputsState.name}
        fz={30}
        onChange={(e) =>
          setInputsState({ ...inputsState, name: e.target.value })
        }
      />

      {(imageBuffer || inputsState.image) && (
        <div className={'image'}>
          <label htmlFor="editImg" className="btn" title={'Select New Image'}>
            <img
              src={`${imageBuffer || BASE_URL + inputsState.image}`}
              alt=""
            />
          </label>
          <Input
            id={'editImg'}
            type={'file'}
            none
            onChange={(e) => selectImageHandler(e)}
          />
        </div>
      )}
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
        . Max: {DESCRIPTION_LIMIT}
      </div>
      <TextArea
        rows={10}
        placeholder={`Please write description about the person shortly. Limit: ${DESCRIPTION_LIMIT}`}
        value={inputsState.description}
        onChange={(e) =>
          setInputsState({ ...inputsState, description: e.target.value })
        }
      />

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
    display: grid;
    grid-gap: 8px;
    overflow: hidden;
    border-radius: 0;
  }
  .image label {
    cursor: pointer;
    justify-self: center;
  }
  .image label img {
    max-height: 300px;
  }
`

export default EditPerson
