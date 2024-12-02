import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { GridContainer } from '../atoms/GridContainer';
import { Input } from '../atoms/Input';
import { Typography } from '../atoms/Typography';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../atoms/Button';

const ORDER_SCHEMA = z.object({
  name: z.string().min(1, { message: '*Required' }),
  quantity: z
    .string()
    .min(1, { message: '*Required' })
    .regex(new RegExp('^[0-9]*$'), { message: '*Numbers only' }),
  city: z.string().min(1, { message: '*Required' }),
  state: z.string().min(1, { message: '*Required' }),
  country: z.string().min(1, { message: '*Required' }),
});

type OrderInputs = z.infer<typeof ORDER_SCHEMA>;

export default function OrderForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderInputs>({
    resolver: zodResolver(ORDER_SCHEMA),
  });

  const onSubmit: SubmitHandler<OrderInputs> = (data) => {
    // TODO: insert into database to product a order
    console.log('data', data);
  };

  return (
    <section className="flex h-screen w-full flex-col justify-center bg-primary-300">
      <GridContainer className="relative">
        <div className="col-span-full mb-8 text-center">
          <Typography variant="heading1" color="text-secondary-100">
            Taste it now
          </Typography>
        </div>

        <div className="col-span-6 col-start-4 flex flex-col gap-8">
          <Link href="/privacy">
            <Typography variant="link" color="text-primary-100">
              How do we use your information?
            </Typography>
          </Link>

          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              placeholder="Your Name"
              errors={errors}
              {...register('name', { required: true })}
            />

            <Input
              placeholder="Quantity"
              errors={errors}
              type="number"
              {...register('quantity', { required: true })}
            />
            <Input
              placeholder="City"
              errors={errors}
              {...register('city', { required: true })}
            />
            <Input
              placeholder="State/Province"
              errors={errors}
              {...register('state', { required: true })}
            />
            <Input
              placeholder="Country"
              errors={errors}
              {...register('country', { required: true })}
            />

            <Button type="submit">
              <span>Get it!</span>
            </Button>
          </form>
        </div>
      </GridContainer>
    </section>
  );
}