import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function FirmCard({ firm, onEdit }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 flex">
      {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
      <img
        src={firm.image}
        alt={firm.name}
        className="relative z-20 aspect-video w-full object-cover brightness-70 dark:brightness-60"
      />
      <CardHeader className={'flex-1'}>
        <div className="flex justify-between">
          <CardTitle>{firm.name}</CardTitle>
          <Badge variant="outline">
            <Link to={`tel:${firm.phone}`}>{firm.phone}</Link>
          </Badge>
        </div>
        <CardDescription className="line-clamp-3">
          {firm.address}{' '}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex gap-2 flex-wrap">
        <Button size="sm" className="flex-1">
          <Link to={`/stock/firms/${firm._id}`}>View Details</Link>
        </Button>
        <Button size="sm" variant="outline" className="" onClick={() => onEdit(firm)}>
          Edit
        </Button>
        <Button size="sm" variant="destructive" className="">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
