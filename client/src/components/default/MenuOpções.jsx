import { Menu } from "@headlessui/react";
import { MoreVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuOpcoes({click1, texto1, click2, texto2}) {

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="p-2 rounded-full hover:bg-blue-200 transition">
        <MoreVertical size={24} />
      </Menu.Button>

      <AnimatePresence>
        <Menu.Items
          as={motion.div}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-full top-0 ml-2 w-56 rounded-2xl bg-white/80 backdrop-blur-md border border-white/30 shadow-xl z-50"

        >
          <Menu.Item>
            {({ active }) => (
              <div
                onClick={click1}
                className={`px-5 py-3 text-sm font-medium rounded-t-2xl cursor-pointer transition ${
                  active
                    ? "bg-blue-200 text-blue-900"
                    : "text-blue-800 hover:bg-blue-100"
                }`}
              >
                {texto1}
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                onClick={click2}
                className={`px-5 py-3 text-sm font-medium rounded-b-2xl cursor-pointer transition ${
                  active
                    ? "bg-blue-200 text-blue-900"
                    : "text-blue-800 hover:bg-blue-100"
                }`}
              >
                {texto2}
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </AnimatePresence>
    </Menu>
  );
}
