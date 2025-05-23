// src/app/register-product/page.tsx
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useWallet } from "@solana/wallet-adapter-react";
import { createDetachedNFT } from "@/libs/shyft";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Schema for product NFT creation
type Ingredient = { name: string };
const schema = z.object({
  file: z
    .any()
    .refine((f) => f instanceof FileList && f.length > 0, "Chọn file ảnh"),
  name: z.string().min(1, "Nhập tên sản phẩm"),
  brand: z.string().min(1, "Nhập thương hiệu"),
  skinTypes: z.string().min(1, "Nhập loại da phù hợp"),
  ingredients: z
    .array(z.object({ name: z.string().min(1, "Nhập thành phần") }))
    .min(1, "Phải có ít nhất 1 thành phần"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterProductPage() {
  const { publicKey, connected } = useWallet();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { ingredients: [{ name: "" }] },
  });
  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const onSubmit = async (data: FormData) => {
    if (!connected || !publicKey) {
      toast.error("Vui lòng kết nối ví");
      return;
    }

    try {
      toast.loading("Đang tạo & mint NFT...");

      const res = await createDetachedNFT({
        file: data.file[0],
        network: "devnet",
        creator_wallet: publicKey.toBase58(),
        name: data.name,
        symbol: data.brand,
        description: `Loại da: ${data.skinTypes}`,
        attributes: data.ingredients.map((i) => ({
          trait_type: "ingredient",
          value: i.name,
        })),
        external_url: "",
        max_supply: 0,
        royalty: 0,
        receiver: publicKey.toBase58(),
        fee_payer: publicKey.toBase58(),
      });

      if (!res.success) {
        throw new Error(res.message || "Mint thất bại");
      }

      toast.dismiss();
      toast.success("NFT tạo thành công!");
    } catch (err: any) {
      // Dismiss loading toast
      toast.dismiss();
      // Log full error
      console.error("createDetachedNFT Error:", err);

      // Extract status and body if FetcherError
      const statusCode = err.statusCode;
      const body = err.body;
      let errorMessage: string;
      if (statusCode) {
        // HTTP error
        console.error(`HTTP Status ${statusCode}:`, body);
        if (body) {
          errorMessage =
            typeof body === "string"
              ? body
              : body.message || JSON.stringify(body);
        } else {
          errorMessage = err.message || "Có lỗi xảy ra";
        }
      } else {
        // Non-HTTP error
        errorMessage = err.message || "Có lỗi xảy ra";
      }
      toast.error(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto py-8"
    >
      <div>
        <Input type="file" accept="image/*" {...register("file")} />
        {errors.file?.message && (
          <p className="text-red-500 text-sm">
            {errors.file.message.toString()}
          </p>
        )}
      </div>

      <div>
        <Input placeholder="Tên sản phẩm" {...register("name")} />
        {errors.name?.message && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input placeholder="Thương hiệu" {...register("brand")} />
        {errors.brand?.message && (
          <p className="text-red-500 text-sm">{errors.brand.message}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Loại da phù hợp (comma-separated)"
          {...register("skinTypes")}
        />
        {errors.skinTypes?.message && (
          <p className="text-red-500 text-sm">{errors.skinTypes.message}</p>
        )}
      </div>

      <div className="space-y-2">
        {fields.map((field, idx) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              placeholder="Ingredient"
              {...register(`ingredients.${idx}.name` as const)}
            />
            <Button variant="ghost" type="button" onClick={() => remove(idx)}>
              -
            </Button>
          </div>
        ))}
        {errors.ingredients?.message && (
          <p className="text-red-500 text-sm">
            {errors.ingredients.message as string}
          </p>
        )}
        <Button type="button" size="sm" onClick={() => append({ name: "" })}>
          + Thêm thành phần
        </Button>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Đang xử lý..." : "Đăng sản phẩm NFT"}
      </Button>
    </form>
  );
}
