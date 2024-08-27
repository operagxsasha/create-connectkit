
'use client'

import { useState, useEffect } from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import rightIcon from '@/assets/images/right.svg'
import Tag from '../Tag';

import styles from './index.module.css'

type InputWrapperProps = {
  label?: String;
  children?: React.ReactNode
}

function InputWrapper(props: InputWrapperProps) {

  return (
    <div className={styles['input-wrapper']}>
      <div className={styles['label']}>{props.label}</div>
      {props.children}
    </div>
  )
}

type InputProps = {
  value: string | undefined;
  setValue: (data: string) => void;
  label: String;
  children?: React.ReactNode;
  placeholder?: string;
  type?: string;
  suffix?: string
}

export function Input(props: InputProps) {
  const { value, setValue } = props;

  const handleInputValue = (e) => {
    setValue(e.target.value)
  }

  return (
    <InputWrapper label={props.label}>
      <input type={props.type || 'text'} className={styles['input']} placeholder={props.placeholder} value={value} onChange={handleInputValue} />
      {
        props.suffix && (
          <span className={styles['suffix']}>{props.suffix}</span>
        )
      }
    </InputWrapper>
  )
}

type TextareaProps = {
  value: string;
  setValue: (data: string) => void;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  tags?: {
    key: string,
    value: string
  }[];
  type?: string;
}

export function Textarea(props: TextareaProps) {
  const { value, setValue } = props;

  const handleInputValue = (e) => {
    setValue(e.target.value)
  }

  const handleClickTag = (data: string) => {
    setValue(data)
  }

  return (
    <InputWrapper label={props.label}>
      <textarea className={styles.textarea} value={value} onChange={handleInputValue} placeholder={props.placeholder} />
      {
        props.tags && !value && (
          <div className={styles.tags}>
            {
              props.tags.map(item => (
                <Tag key={item.key} onClick={() => handleClickTag(item.value)}>{item.key}</Tag>
              ))
            }
          </div>
        )
      }
    </InputWrapper>
  )
}

type SelectorProps = {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  type?: string;
  placeholder?: string;
}

export function Selector(props: SelectorProps) {
  const [toggleOptions, setToggleOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const { options = [] } = props;

  const handleSelectValue = (e) => {
    setSelectedValue(e.target.getAttribute("data-value"));
    setToggleOptions(false);
  }

  const handleOnBlur = (e) => {
    if (e.target.id !== 'options' && e.target.id !== 'selector') {
      setToggleOptions(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOnBlur);

    return () => {
      document.removeEventListener('click', handleOnBlur)
    }
  }, [])

  return (
    <InputWrapper label={props.label}>
      <input id="selector" type={props.type || 'text'} readOnly className={styles['input']} value={selectedValue} placeholder={props.placeholder} onFocus={() => setToggleOptions(true)} />
      {
        toggleOptions && (
          <div className={styles.options} id="options">
            {
              options.map(item => (
                <div key={item.value} onClick={handleSelectValue} className={classnames(styles.option, selectedValue === item.value ? styles['option-selected']  : '')} data-value={item.value}>{item.label}
                  {
                    selectedValue === item.value ? (
                      <Image className={styles['right-icon']} alt='right' src={rightIcon}></Image>
                    ) : null
                  }
                </div>
              ))
            }
          </div>
        )
      }
    </InputWrapper>
  )
}