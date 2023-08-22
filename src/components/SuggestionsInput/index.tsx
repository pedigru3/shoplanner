import { IconButton } from '@components/IconButton';
import { useQuery } from '@libs/realm';
import { Item } from '@libs/realm/schemas/Item';
import { Market } from '@libs/realm/schemas/Market';
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter';
import { Button, Text, View } from 'native-base';
import React, { useState } from 'react';
import Autocomplete from 'react-native-autocomplete-input'
import { useTheme } from 'styled-components';

type Props = {
  placeHolder: string,
  type: 'Item' | 'Market'
  onBlur?: (itemName: string) => void
  hasIcon?: boolean
  onPressIcon?: (itemName: string) => void
}

export function SuggestionsInput({type, onBlur, placeHolder, hasIcon=false, onPressIcon}: Props) {
  const [query, setQuery] = useState('')
  const data = useQuery<Item | Market>(type).filtered('name BEGINSWITH[c] $0', query)

  const [isHidden, setIsHidden] = useState(true)
  const { COLORS, FONT_FAMILY, FONT_SIZE } = useTheme()

  function handleChangeText(text: string){
    if (text === ''){
      setQuery(text)
      setIsHidden(true)
      return
    }
    setQuery(text)
    setIsHidden(false)
  }

  function handleOnPress(text: string){
    setIsHidden(true)
    setQuery(text)
    onBlur ? onBlur(text) : ''
  }

  function handleOnBlur(){
    setIsHidden(true)
    onBlur ? onBlur(query) : ''
  }

  function handleOnPressIcon(){
    setIsHidden(true)
    onPressIcon ? onPressIcon(query) : ''
    setQuery('')

  }

  return (
    <View flex={1}>
      <View flex={1} left={0} position='absolute' right={0} top={0} zIndex={1}>
        <Autocomplete
          placeholder={placeHolder}
          onBlur={handleOnBlur}
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: COLORS.RED_500,
            borderRadius: 10,
            paddingLeft: 16,
            paddingRight: hasIcon ? 50 : 16,
            textAlign: 'center',
            fontFamily: FONT_FAMILY.BODY_REGULAR,
            fontSize: FONT_SIZE.LG
          }}
          inputContainerStyle={{
            borderWidth: 0,
            margin: 0,
          }}
          hideResults={isHidden}
          data={data}
          value={query}
          onChangeText={handleChangeText}
          flatListProps={{
            keyboardShouldPersistTaps:'always',
            keyExtractor: (item) => item.name,
            style: {
              margin: 0,
              borderWidth: 0,
            },
            renderItem: ({ item }) => (
              <Button
                marginTop={2}
                bg={COLORS.RED_100}
                borderRadius={10}
                _pressed={{
                  backgroundColor: COLORS.GRAY_100
                }}
                onPress={()=> handleOnPress(capitalizeFirstLetter(item.name))}
              >
                <Text>{capitalizeFirstLetter(item.name)}</Text>
              </Button>
            ),
          }}
        />
         {
          hasIcon &&
          <View position='absolute' right={4}>
          <IconButton
              iconName='add'
              onPress={handleOnPressIcon}
            />
         </View>
         }
      </View>
    </View>
  );
}