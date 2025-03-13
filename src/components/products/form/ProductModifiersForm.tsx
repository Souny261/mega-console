
import { useState } from "react";
import { Modifier, ModifierOption } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, X, Plus, Minus, GripVertical } from "lucide-react";

interface ProductModifiersFormProps {
  modifiers: Modifier[];
  setModifiers: (modifiers: Modifier[]) => void;
}

const ProductModifiersForm = ({
  modifiers,
  setModifiers,
}: ProductModifiersFormProps) => {
  const [selectedModifier, setSelectedModifier] = useState<string | null>(
    modifiers.length > 0 ? modifiers[0].id : null
  );

  // Add a new modifier
  const handleAddModifier = () => {
    const newModifier: Modifier = {
      id: `modifier-${Date.now()}`,
      name: "New Modifier",
      type: "checkbox",
      required: false,
      options: [
        {
          id: `option-${Date.now()}`,
          name: "Option 1",
          priceAdjustment: 0,
        },
      ],
    };
    
    const updatedModifiers = [...modifiers, newModifier];
    setModifiers(updatedModifiers);
    setSelectedModifier(newModifier.id);
  };

  // Remove a modifier
  const handleRemoveModifier = (modifierId: string) => {
    const updatedModifiers = modifiers.filter((m) => m.id !== modifierId);
    setModifiers(updatedModifiers);
    
    if (selectedModifier === modifierId) {
      setSelectedModifier(updatedModifiers.length > 0 ? updatedModifiers[0].id : null);
    }
  };

  // Update modifier name
  const handleUpdateModifierName = (modifierId: string, name: string) => {
    setModifiers(
      modifiers.map((m) =>
        m.id === modifierId ? { ...m, name } : m
      )
    );
  };

  // Update modifier type
  const handleUpdateModifierType = (modifierId: string, type: 'checkbox' | 'radio' | 'select') => {
    setModifiers(
      modifiers.map((m) =>
        m.id === modifierId ? { ...m, type } : m
      )
    );
  };

  // Update modifier required status
  const handleUpdateModifierRequired = (modifierId: string, required: boolean) => {
    setModifiers(
      modifiers.map((m) =>
        m.id === modifierId ? { ...m, required } : m
      )
    );
  };

  // Add option to modifier
  const handleAddOption = (modifierId: string) => {
    setModifiers(
      modifiers.map((m) => {
        if (m.id === modifierId) {
          return {
            ...m,
            options: [
              ...m.options,
              {
                id: `option-${Date.now()}`,
                name: `Option ${m.options.length + 1}`,
                priceAdjustment: 0,
              },
            ],
          };
        }
        return m;
      })
    );
  };

  // Update option
  const handleUpdateOption = (
    modifierId: string,
    optionId: string,
    field: keyof ModifierOption,
    value: string | number
  ) => {
    setModifiers(
      modifiers.map((m) => {
        if (m.id === modifierId) {
          return {
            ...m,
            options: m.options.map((o) => {
              if (o.id === optionId) {
                return { ...o, [field]: value };
              }
              return o;
            }),
          };
        }
        return m;
      })
    );
  };

  // Remove option
  const handleRemoveOption = (modifierId: string, optionId: string) => {
    setModifiers(
      modifiers.map((m) => {
        if (m.id === modifierId) {
          return {
            ...m,
            options: m.options.filter((o) => o.id !== optionId),
          };
        }
        return m;
      })
    );
  };

  // Get the active modifier
  const activeModifier = selectedModifier
    ? modifiers.find((m) => m.id === selectedModifier)
    : null;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-5 h-full">
          {/* Sidebar */}
          <div className="bg-gray-50 p-4 border-r">
            <div className="mb-4">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={handleAddModifier}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Modifier
              </Button>
            </div>
            <div className="space-y-1">
              {modifiers.map((modifier) => (
                <div
                  key={modifier.id}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer text-sm ${
                    selectedModifier === modifier.id
                      ? "bg-productBlue-50 text-productBlue-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedModifier(modifier.id)}
                >
                  <span className="truncate">{modifier.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveModifier(modifier.id);
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {modifiers.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No modifiers yet
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-4 p-6">
            {activeModifier ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="modifier-name">Modifier Name</Label>
                    <Input
                      id="modifier-name"
                      value={activeModifier.name}
                      onChange={(e) => handleUpdateModifierName(activeModifier.id, e.target.value)}
                      placeholder="e.g. Size, Toppings, Add-ons"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modifier-type">Selection Type</Label>
                    <Select
                      value={activeModifier.type}
                      onValueChange={(value) => 
                        handleUpdateModifierType(
                          activeModifier.id, 
                          value as 'checkbox' | 'radio' | 'select'
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checkbox">Checkbox (Multiple Selection)</SelectItem>
                        <SelectItem value="radio">Radio (Single Selection)</SelectItem>
                        <SelectItem value="select">Dropdown (Single Selection)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="required"
                    checked={activeModifier.required}
                    onCheckedChange={(checked) =>
                      handleUpdateModifierRequired(activeModifier.id, checked)
                    }
                  />
                  <Label htmlFor="required">Required Selection</Label>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Options</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddOption(activeModifier.id)}
                    >
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add Option
                    </Button>
                  </div>

                  {activeModifier.options.length > 0 ? (
                    <div className="space-y-3">
                      {activeModifier.options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center gap-3 p-3 border rounded-md bg-white"
                        >
                          <div className="text-gray-400 cursor-move">
                            <GripVertical className="w-5 h-5" />
                          </div>
                          <div className="flex-1 grid md:grid-cols-2 gap-3">
                            <Input
                              value={option.name}
                              onChange={(e) =>
                                handleUpdateOption(
                                  activeModifier.id,
                                  option.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="Option Name"
                            />
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Price Adjustment:</span>
                              <div className="flex items-center">
                                <span className="px-2">$</span>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={option.priceAdjustment === 0 ? "" : option.priceAdjustment}
                                  onChange={(e) =>
                                    handleUpdateOption(
                                      activeModifier.id,
                                      option.id,
                                      "priceAdjustment",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  className="w-24"
                                />
                              </div>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveOption(activeModifier.id, option.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-6 border rounded-md">
                      <p className="text-gray-500">No options yet</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddOption(activeModifier.id)}
                        className="mt-4"
                      >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add First Option
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">
                  {modifiers.length === 0
                    ? "No modifiers added yet. Add your first modifier to get started."
                    : "Select a modifier from the list to edit it."}
                </p>
                <Button type="button" variant="outline" onClick={handleAddModifier}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  {modifiers.length === 0 ? "Add First Modifier" : "Add New Modifier"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductModifiersForm;
