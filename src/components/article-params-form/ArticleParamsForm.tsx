import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';
import { useState, useRef } from 'react';


type ArticleParamsFormProps = {
	setCurrentArticleState: (param: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectArticleState, setSelectArticleState] =
    useState<ArticleStateType>(currentArticleState);
	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({ ...selectArticleState, [key]: value });
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
		setCurrentArticleState(defaultArticleState);
    setSelectArticleState(defaultArticleState);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentArticleState(selectArticleState);
  }

	return (
		<>
			<ArrowButton  onClick={() => setIsOpen(!isOpen)}  isOpen={isOpen}/>
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
          onSubmit={handleSubmit}
          onReset={handleReset}
          >
					<Text
						children={'Задайте параметры'}
						size={31}
						weight={800}
						uppercase={true}
						align={'left'}
						family={'open-sans'}></Text>
					<Select
						selected={selectArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						title={'шрифт'}
						onChange={(option) => handleChange('fontFamilyOption', option)}
					/>
					<RadioGroup
						name={'размер шрифта'}
						options={[{
              title: '18 px', value: '18 px',
              className: 'size18'
            }, 
            {
              title: '25 px', value: '25 px',
              className: 'size25'
            },
            {
              title: '38 px', value: '38 px',
              className: 'size38'
            }]}
						selected={{
							title: selectArticleState.fontSizeOption.title,
							value: selectArticleState.fontSizeOption.value,
							className: selectArticleState.fontSizeOption.className,
							optionClassName: undefined,
						}}
						title={'размер шрифта'}
            onChange={(option) => handleChange('fontSizeOption', option)}
					/>
					<Select
						selected={selectArticleState.fontColor}
						options={fontColors}
						title={'цвет шрифта'}
						onChange={(option) => handleChange('fontColor', option)}
					/>
          <Separator/>
          <Select
						selected={selectArticleState.backgroundColor}
						options={backgroundColors}
						title={'цвет фона'}
						onChange={(option) => handleChange('backgroundColor', option)}
					/>
          <Select
						selected={selectArticleState.contentWidth}
						options={contentWidthArr}
						title={'ширина контента'}
						onChange={(option) => handleChange('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

