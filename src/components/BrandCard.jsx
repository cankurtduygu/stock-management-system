import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function BrandCard({ brand, onEdit }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm flex shadow-lg overflow-hidden">
      <CardHeader className='text-center text-2xl'>
        <CardTitle >{brand.name}</CardTitle>
      </CardHeader>
      <img
        src={brand.image}
        alt={brand.name}
        className="relative z-20 aspect-video w-full object-cover brightness-70  dark:brightness-60"
      />
      <CardFooter className="mt-auto flex justify-center gap-2 flex-wrap">
        <Button size="sm" variant="outline" onClick={() => onEdit(brand)}>
          Edit
        </Button>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
