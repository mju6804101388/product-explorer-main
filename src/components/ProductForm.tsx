// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { CATEGORIES, ProductDraftSchema } from "@/lib/products";
// import type { Product, ProductDraft } from "@/lib/products";

// type ProductFormProps = {
//     editing: Product | null;
//     onSave: (draft: ProductDraft) => void;
//     onCancel: () => void;
// };
// export default function ProductForm(
//     { editing, onSave, onCancel }: ProductFormProps
// ) {
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors, isDirty, isValid },
//     } = useForm<ProductDraft>({
//         resolver: zodResolver(ProductDraftSchema),
//         mode: "onTouched",
//         defaultValues: editing
//             ? {
//                 title: editing.title, price: editing.price,
//                 stock: editing.stock, category: editing.category
//             }
//             : { title: "", price: undefined, stock: undefined },
//     });

//     return (
//         <form>
//             <label htmlFor="title">ชื่อสินค้า</label>
//             <input
//                 id="title"
//                 required
//                 {...register("title")}
//                 aria-invalid={!!errors.title}
//                 aria-describedby="title-error"
//             />
//             <span id="title-error" role="alert">{errors.title?.message}</span>
//             <label htmlFor="price">ราคา</label>
//             <input
//                 id="price"
//                 type="number"
//                 step="0.01"
//                 required
//                 // เติม: ตัวเลือกที่สั่งให้แปลงค่าเป็นตัวเลขก่อนส่งให้ Schema 
//                 {...register("price", { valueAsNumber: true })}
//                 aria-invalid={!!errors.price}
//                 aria-describedby="price-error"
//             />
//             <label htmlFor="stock">คงเหลือ</label>
//             <input
//                 id="stock"
//                 type="number"
//                 required
//                 {...register("stock", { valueAsNumber: true })}
//                 aria-invalid={!!errors.stock}
//                 aria-describedby="stock-error"
//             />
//             <span id="stock-error" role="alert">{errors.stock?.message}</span>
//         </form>
//     );
// }
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CATEGORIES, ProductDraftSchema } from "@/lib/products";
import type { Product, ProductDraft } from "@/lib/products";

type ProductFormProps = {
    editing: Product | null;
    onSave: (draft: ProductDraft) => void;
    onCancel: () => void;
};

export default function ProductForm({
    editing,
    onSave,
    onCancel,
}: ProductFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
    } = useForm<ProductDraft>({
        resolver: zodResolver(ProductDraftSchema),
        mode: "onTouched",
        defaultValues: editing
            ? {
                title: editing.title,
                price: editing.price,
                stock: editing.stock,
                category: editing.category,
            }
            : { title: "", price: undefined, stock: undefined },
    });
    function saveProduct(values: ProductDraft) {
        onSave(values);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(saveProduct)} noValidate>
            {/* 1. ช่องชื่อสินค้า */}
            <label htmlFor="title">ชื่อสินค้า</label>
            <input
                id="title"
                required
                {...register("title")}
                aria-invalid={!!errors.title}
                aria-describedby="title-error"
            />
            <span id="title-error" role="alert">{errors.title?.message}</span>

            {/* 2. ช่องราคา */}
            <label htmlFor="price">ราคา</label>
            <input
                id="price"
                type="number"
                step="0.01"
                required
                {...register("price", { valueAsNumber: true })}
                aria-invalid={!!errors.price}
                aria-describedby="price-error"
            />
            <span id="price-error" role="alert">{errors.price?.message}</span>

            {/* 3. ช่องสต็อก (stock) */}
            <label htmlFor="stock">คงเหลือ</label>
            <input
                id="stock"
                type="number"
                required
                {...register("stock", { valueAsNumber: true })}
                aria-invalid={!!errors.stock}
                aria-describedby="stock-error"
            />
            <span id="stock-error" role="alert">{errors.stock?.message}</span>

            {/* 4. ช่องหมวดหมู่สินค้า */}
            <label htmlFor="category">หมวดหมู่</label>
            <select
                id="category"
                required
                {...register("category")}
                aria-invalid={!!errors.category}
                aria-describedby="category-error"
            >
                <option value="">-- เลือกหมวดหมู่ --</option>
                {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
            <span id="category-error" role="alert">{errors.category?.message}</span>

            {/* 5. ปุ่มการทำงาน */}
            <div className="flex gap-2 mt-4">
                <button type="submit" disabled={!isDirty || !isValid}>
                    {editing ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
                </button>
                <button type="button" onClick={onCancel}>
                    ยกเลิก
                </button>
            </div>
            <label htmlFor="category">หมวดหมู่</label>
            <select
                id="category"
                required
                {...register("category")}
                aria-invalid={!!errors.category}
                aria-describedby="category-error"
            >
                <option value="">กรุณาเลือกหมวดหมู่</option>
                {CATEGORIES.map((name) => (
                    <option key={name} value={name}>{name}</option>
                ))}
            </select>
            <span id="category-error" role="alert">
                {errors.category?.message}
            </span>
            <button
                type="submit"
                // เติม: ค่าที่บอกว่าข้อมูลทั้งฟอร์มผ่าน Schema แล้วหรือไม่ 
                disabled={!isDirty || !isValid}
            >
                {editing ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
            </button>

            {editing && (
                <button type="button" onClick={onCancel}>ยกเลิก</button>
            )}

        </form>
    );
}