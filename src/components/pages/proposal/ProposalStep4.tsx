import { useState, useEffect, ChangeEvent } from 'react';

import { Typography, FormLabel, FormControlLabel, Switch, Checkbox } from '@mui/material';
import PhotoUpload from '@/components/block/photoUpload/PhotoUpload';
import {
  InputText,
  InputTextMultiline,
  InputSelect,
  InputDatepicker,
  InputTextDeco,
  InputRadio,
  Editor,
  InputCheckbox,
  Switcher,
} from '@/components/block/form';
import { Control, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import Link from 'next/link';
import routePath from '@/routes/routePath';
import clsxm from '@/libraries/utils/clsxm';

const multiProductCheckoutOptions = ['僅計算一次', '將總運費相加'];
const freeShippingOptions = ['無減免條件', '結帳滿'];
const cvsList = ['7-11', '全家', '萊爾富'];
const bankList = [
  '004 台灣銀行',
  '005 土地銀行',
  '007 第一銀行',
  '008 華南銀行',
  '009 彰化銀行',
  '011 上海銀行',
  '012 台北富邦',
  '013 國泰世華',
  '017 兆豐商銀',
  '021 花旗銀行',
];

interface ProposalStep4Props {
  setValue: UseFormSetValue<any>;
  getValues: any;
  errors: FieldErrors<any>;
  control: Control<any>;
  watch: UseFormWatch<any>;
}
const ProposalStep4: React.FC<ProposalStep4Props> = ({ control, errors, setValue, getValues, watch }) => {
  const [imageUploaded, setImageUploaded] = useState<string>('');
  // const [shippingSwitch, setShippingSwitch] = useState<boolean>(true);
  const [sameRepresent, setSameRepresent] = useState(false);

  const handleSameRepresentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSameRepresent(e.target.checked);
    if (e.target.checked) {
      setValue('senderName', getValues('representativeName'));
      setValue('senderPhone', getValues('representativePhone'));
    } else {
      setValue('senderName', '');
      setValue('senderPhone', '');
    }
  };
  const shippingSwitchValue = watch('shippingSwitch');
  const deliverySwitchValue = watch('deliverySwitch');
  const cvsSwitchValue = watch('cvsSwitch');

  useEffect(() => {
    if (imageUploaded) {
      setValue('projectImage', imageUploaded);
    }
  }, [imageUploaded, setValue]);

  return (
    <div className="py-5 md:py-10 px-5 md:px-20  bg-white w-full rounded-md md:border md:border-solid md:border-secondary-10">
      <Typography className="text-secondary mb-5 text-center" component="h3" variant="h6">
        提領設定(必填)
      </Typography>
      <div className="mb-10 w-full">
        <div className="grid grid-cols-2 gap-3">
          <InputSelect
            control={control}
            error={!!errors.projectCategory}
            // helperText={errors.projectCategory?.message}
            name={'projectCategory'}
            label={'提領銀行 *'}
            items={bankList}
            isNumber={true}
          />

          <InputText
            control={control}
            error={!!errors.projectName}
            helperText={errors.projectName?.message}
            name={'projectName'}
            label={'銀行帳號 *'}
            defaultValue={''}
          />

          <Typography className="col-span-full text-secondary-66" component="p" variant="caption">
            專案順利達標後，您將根據逐筆訂單所使用的付款方式支付「平台服務費用」與「金流服務費用」。
            若對應訂單使用信用卡付款，募質部將收取 5.5% 募質部平台手續費，金流服務商則將依據消費者付款類別（如：國內 /
            外信用卡、銀聯卡、Google Pay、Samsung Pay 等），收取不同比例之金流手續費，詳情可見 「消費者付費條款」。
          </Typography>
          <div className="col-span-full flex items-center">
            <InputCheckbox
              control={control}
              name={'isAgreeTerms'}
              label={'已閱讀並同意'}
              defaultValue={false}
              className="text-secondary mr-1"
            />
            <Link
              className="text-primary no-underline hover:text-secondary visited:text-primary"
              href={routePath.userTerms}
            >
              <Typography component="p" variant="body16">
                消費者付費條款
              </Typography>
            </Link>
          </div>
        </div>
      </div>

      <Typography className="text-secondary mb-2 text-center" component="h3" variant="h6">
        物流設定(非必填)
      </Typography>
      <Typography className="text-secondary-66 mb-5 text-center" component="p" variant="caption">
        設定網站會員如何購買募質商品，以及募質商品的寄送物流
      </Typography>
      <div className="mb-10 w-full">
        <div className="w-full text-center mb-5">
          <Switcher
            control={control}
            name={'shippingSwitch'}
            label={'是否需要開啟物流'}
            className={'ml-0 text-secondary-66 '}
          />
        </div>
        {shippingSwitchValue && (
          <>
            <div
              className={clsxm(
                deliverySwitchValue == 1 && 'pt-2 pb-5',
                deliverySwitchValue == 0 && 'py-2 ',
                'w-full mb-5 border border-solid border-secondary-50 px-5  rounded-md',
              )}
            >
              <Switcher
                control={control}
                name={'deliverySwitch'}
                label={'宅配寄送'}
                className={'ml-0  text-secondary-66 '}
                defaultValue={0}
              />
              {deliverySwitchValue == 1 && (
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <InputTextDeco
                    control={control}
                    error={!!errors.deliveryFee}
                    // helperText={errors.deliveryFee?.message}
                    name={'deliveryFee'}
                    label={'運費 *'}
                    deco={'NT$'}
                    defaultValue={100}
                    className={'col-span-full'}
                  />
                  <InputRadio
                    control={control}
                    error={!!errors.multiProductCheckout}
                    // helperText={errors.multiProductCheckout?.message}
                    name={'multiProductCheckout'}
                    label={'多商品結帳'}
                    defaultValue={0}
                    items={multiProductCheckoutOptions}
                    classNameForm={'col-span-full flex flex-row flex-wrap items-center justify-start space-x-2 pb-0'}
                    classNameRadio={'mr-2 md:mr-5'}
                  />

                  <div className="col-span-full flex items-end md:items-center">
                    <InputRadio
                      control={control}
                      error={!!errors.freeShippingConditions}
                      // helperText={errors.freeShippingConditions?.message}
                      name={'freeShippingConditions'}
                      label={'運費減免條件'}
                      defaultValue={0}
                      items={freeShippingOptions}
                      classNameForm={
                        'col-span-full flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-start md:space-x-2'
                      }
                      classNameRadio={'mr-2 md:mr-5'}
                    />
                    <div className="flex items-center justify-start">
                      <InputTextDeco
                        control={control}
                        error={!!errors.freeShippingPrice}
                        // helperText={errors.freeShippingPrice?.message}
                        name={'freeShippingPrice'}
                        label={''}
                        deco={'NT$'}
                        defaultValue={100}
                        className={'w-[100px]'}
                      />
                      <Typography className="ml-2 whitespace-nowrap" component="p" variant="body16">
                        免運
                      </Typography>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <FormControlLabel
                      className="text-secondary"
                      control={<Checkbox checked={sameRepresent} onChange={handleSameRepresentChange} />}
                      name="sameRepresent"
                      label="下方帶入代表人資料"
                    />
                  </div>

                  <InputText
                    control={control}
                    error={!!errors.senderName}
                    // helperText={errors.senderName?.message}
                    name={'senderName'}
                    label={'寄件人姓名 *'}
                    defaultValue={''}
                  />

                  <InputText
                    control={control}
                    error={!!errors.senderPhone}
                    // helperText={errors.senderPhone?.message}
                    name={'senderPhone'}
                    label={'寄件人電話 *'}
                    defaultValue={''}
                  />

                  <InputText
                    className="col-span-full"
                    control={control}
                    error={!!errors.senderAddress}
                    // helperText={errors.senderAddress?.message}
                    name={'senderAddress'}
                    label={'寄件地址 *'}
                    defaultValue={''}
                  />
                </div>
              )}
            </div>
            <div
              className={clsxm(
                cvsSwitchValue == 1 && 'pt-2 pb-5',
                cvsSwitchValue == 0 && 'py-2 ',
                'w-full mb-5 border border-solid border-secondary-50 px-5  rounded-md',
              )}
            >
              <Switcher
                control={control}
                name={'cvsSwitch'}
                label={'超商取貨'}
                className={'ml-0  text-secondary-66 '}
                defaultValue={0}
              />
              {cvsSwitchValue == 1 && (
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <InputTextDeco
                    control={control}
                    error={!!errors.deliveryFee}
                    // helperText={errors.deliveryFee?.message}
                    name={'deliveryFee'}
                    label={'運費 *'}
                    deco={'NT$'}
                    defaultValue={70}
                    className={'col-span-full'}
                  />
                  <InputRadio
                    control={control}
                    error={!!errors.multiProductCheckout}
                    // helperText={errors.multiProductCheckout?.message}
                    name={'multiProductCheckout'}
                    label={'多商品結帳'}
                    defaultValue={0}
                    items={multiProductCheckoutOptions}
                    classNameForm={'col-span-full flex flex-row flex-wrap items-center justify-start space-x-2 pb-0'}
                    classNameRadio={'mr-2 md:mr-5'}
                  />

                  <div className="col-span-full flex items-end md:items-center">
                    <InputRadio
                      control={control}
                      error={!!errors.freeShippingConditions}
                      // helperText={errors.freeShippingConditions?.message}
                      name={'freeShippingConditions'}
                      label={'運費減免條件'}
                      defaultValue={0}
                      items={freeShippingOptions}
                      classNameForm={
                        'col-span-full flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-start md:space-x-2'
                      }
                      classNameRadio={'mr-2 md:mr-5'}
                    />
                    <div className="flex items-center justify-start">
                      <InputTextDeco
                        control={control}
                        error={!!errors.freeShippingPrice}
                        // helperText={errors.freeShippingPrice?.message}
                        name={'freeShippingPrice'}
                        label={''}
                        deco={'NT$'}
                        defaultValue={100}
                        className={'w-[100px]'}
                      />
                      <Typography className="ml-2 whitespace-nowrap" component="p" variant="body16">
                        免運
                      </Typography>
                    </div>
                  </div>

                  <InputSelect
                    className={'col-span-full'}
                    control={control}
                    error={!!errors.projectCategory}
                    // helperText={errors.projectCategory?.message}
                    name={'cvsName'}
                    label={'合作超商 *'}
                    items={cvsList}
                    isNumber={true}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProposalStep4;
