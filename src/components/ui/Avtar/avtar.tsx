
import * as AvatarPrimitive from "@radix-ui/react-avatar";


const AvatarDemo = () => (
	<div className="flex gap-5">
		<AvatarPrimitive.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
			<AvatarPrimitive.Image
				className="size-full rounded-[inherit] object-cover"
				src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
				alt="Colm Tuite"
			/>
			<AvatarPrimitive.Fallback
				className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
				delayMs={600}
			>
				CT
			</AvatarPrimitive.Fallback>
		</AvatarPrimitive.Root>
		<AvatarPrimitive.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
			<AvatarPrimitive.Image
				className="size-full rounded-[inherit] object-cover"
				src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
				alt="Pedro Duarte"
			/>
			<AvatarPrimitive.Fallback
				className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
				delayMs={600}
			>
				JD
			</AvatarPrimitive.Fallback>
		</AvatarPrimitive.Root>
		<AvatarPrimitive.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
			<AvatarPrimitive.Fallback className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11">
				PD
			</AvatarPrimitive.Fallback>
		</AvatarPrimitive.Root>
	</div>
);

export default AvatarDemo;
